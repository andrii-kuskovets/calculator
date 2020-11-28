import React from 'react'
import { calculate, reverse, percent, toNumber, toStr }  from "./Main";

test('17 + 33 = 50', () =>{
    expect(calculate(17, 33, '+')).toBe(50);
})

test('17 * 33 = 561', () =>{
    expect(calculate(17, 33, '*')).toBe(561);
});

test('3.5 * 7.25 = 561', () =>{
    expect(calculate(17, 33, '*')).toBe(561);
});

test('17 - 33 = -16', () =>{
    expect(calculate(17, 33, '-')).toBe(-16);
});

test('50 ÷ 8 = 6.25', () =>{
    expect(calculate(50, 8, '÷')).toBe(6.25);
});

test('-(5) = -5', ()=>{
   expect(reverse(5)).toBe(-5);
});

test('75% = 0.75', ()=>{
    expect(percent(75)).toBe(0.75);
})

test('string \"0,75\" to number = 0.75', () =>{
    expect(toNumber("0,75")).toBe(0.75);
})

test('number 0.75 to sting = \"0,75\"', () =>{
    expect(toStr(0.75)).toBe("0,75");
})

test('(50 + 50) * 3 = 300', () =>{
    expect(calculate(calculate(50, 50, '+'), 3, '*')).toBe(300);
});

test('(75 + 75) / 3 = 50', () =>{
    expect(calculate(calculate(75, 75, '+'), 3, '÷')).toBe(50);
});

test('(2.5 + 2.75) / 0.25 = 21', () =>{
    expect(calculate(calculate(2.5, 2.75, '+'), 0.25 , '÷')).toBe(21);
});

test('(2.5 + 2.75) / 3 = 21', () =>{
    expect(calculate(calculate(2.5, 2.75, '+'), 3, '÷')).toBe(1.75);
});

