import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages: [
        { duration: '5s', target: 100 },  // Subir para 100 VUs em 5 minutos
        { duration: '30s', target: 100 }, // Manter 100 VUs por 30 minutos
        { duration: '5s', target: 0 },    // Reduzir para 0 VUs em 5 minutos
    ],
    thresholds: {
        http_req_duration: ['p(95)<1200'],  // 95% das requisições devem ser concluídas em menos de 1200ms
        http_req_failed: ['rate<0.01'],     // Taxa de erro menor que 1%
    },
};

// Função `setup` para login
export function setup() {
    const loginUrl = 'https://reqres.in/api/login';
    const loginPayload = JSON.stringify({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
    });

    const loginParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(loginUrl, loginPayload, loginParams);

    // Valida a resposta do login
    check(loginRes, {
        'login status code is 200': (r) => r.status === 200,
        'login response has token': (r) => JSON.parse(r.body).token !== undefined,
    });

    const token = JSON.parse(loginRes.body).token;
    return { token };  // Retorna o token para a função principal
}

// Função principal para requisição GET com token
export default function (data) {
    const token = data.token;  // Recebe o token do setup()

    // Requisição GET usando o token obtido no login
    const userUrl = 'https://reqres.in/api/users?page=2';
    const userParams = {
        headers: {
            'Authorization': `Bearer ${token}`,  // Usa o token no cabeçalho de autorização
        },
    };

    const userRes = http.get(userUrl, userParams);  // Faz a chamada GET

    // Valida a resposta do GET
    check(userRes, {
        'user data status code is 200': (r) => r.status === 200,
        'response has user data': (r) => JSON.parse(r.body).data !== undefined,
    });

    console.log('User data response:', userRes.body);  // Exibe a resposta dos dados dos usuários

    sleep(1);
}

// Gera o relatório HTML e JSON
export function handleSummary(data) {
    return {
        '../reports/result_getListUsersSoakTest.html': htmlReport(data),  // Gera o relatório HTML na pasta reports
        '../reports/result_getListUsersSoakTest.json': JSON.stringify(data),  // Gera o relatório JSON na pasta reports
    };
}
