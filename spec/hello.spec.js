
describe("hello", () => {
    it("expect the parameter", () => {
        expect(fizzbuzz(2)).toBe(2);
    });
    it("expect 0 when parameter is not a number", () => {
        expect(fizzbuzz("Random string")).toBe(0);
    });
    it("expect Fizz when parameter is 3 modulus", () => {
        expect(fizzbuzz(3)).toBe('Fizz');
    });
    it("expect Buzz when parameter is 5 modulus", () => {
        expect(fizzbuzz(5)).toBe('Buzz');
    });
    it("expect FizzBuzz when parameter is 15 modulus", () => {
        expect(fizzbuzz(15)).toBe('FizzBuzz');
    });
});


const fizzbuzz = module.exports = (n) => {
    var c = '';
    if(n%3 === 0)
        c += 'Fizz';
    if(n%5 === 0)
        c += 'Buzz';
    return c || (typeof(n) === 'number' ? n : 0);
}
