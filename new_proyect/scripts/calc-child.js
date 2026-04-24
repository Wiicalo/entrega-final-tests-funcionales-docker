const args = process.argv.slice(2)
const numbers = args.map((value) => Number(value));
const operation = process.env.OPERATION || 'sum';


const hasInvalidNumber = numbers.some((value) => Number.isNaN(value));

if(hasInvalidNumber){
    console.error('Todos los argumentos deben ser numeros validos.');
    process.exit(1);
}

let result = 0;

if(operation === 'mul' || operation === 'multiply') {
    result = numbers.reduce((acc, val) => acc * val, 1);
} else {
    result = numbers.reduce((acc, val) => acc + val, 0);
}

process.stdout.write(
    JSON.stringify({
        operation,
        numbers,
        result,
        handledBy: 'child_process',
    }),
);
