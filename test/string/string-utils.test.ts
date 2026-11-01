/*
 * Copyright (c) 2026 Brittni Watkins.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * SPDX-License-Identifier: MIT
 */

import { describe, test, expect } from 'vitest';

import {
    buildSingleLineInputs,
    charactersFromCodePointRange,
    mixStrings,
    negativeSafeIntegerInputs,
    nonArrayInputs,
    nonFiniteNumberInputs,
    nonNumberInputs,
    nonStringInputs,
    pairStrings,
    safeFloatInputs,
    sparseArrayInputs,
    unsafeNumberInputs
} from '../../src';

import { throwsError } from '../utils/error/error-checks';

describe('String Utils', (): void => {
    const nonIntegerCodePointInputs: unknown[] = [
        ...nonNumberInputs,
        ...nonFiniteNumberInputs,
        ...safeFloatInputs
    ];

    const outOfRangeCodePointInputs: number[] = [
        ...unsafeNumberInputs,
        ...negativeSafeIntegerInputs,
        0x110000
    ];

    const nonStringElementInputs: unknown[][] = [
        ...nonStringInputs.map((input: unknown): unknown[] => {
            return [input];
        }),
        ...sparseArrayInputs as unknown[][]
    ];

    describe('buildSingleLineInputs', (): void => {
        test('Should throw a TypeError for non-array inputs', (): void => {
            expect(nonArrayInputs.filter((input: unknown): boolean => {
                return !throwsError((): void => {
                    buildSingleLineInputs(input as string[]);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a TypeError for fewer than two tokens', (): void => {
            expect([[], ['a']].filter((input: string[]): boolean => {
                return !throwsError((): void => {
                    buildSingleLineInputs(input);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a TypeError for tokens with non-string elements', (): void => {
            expect(nonStringElementInputs.filter((input: unknown[]): boolean => {
                return !throwsError((): void => {
                    buildSingleLineInputs(['a'].concat(input as string[]));
                }, TypeError);
            })).toEqual([]);
        });

        test('Should return each token alone, then all tokens joined by single spaces', (): void => {
            expect(buildSingleLineInputs(['a', 'b'])).toEqual(['a', 'b', 'a b']);
            expect(buildSingleLineInputs(['a', 'b', 'c'])).toEqual(['a', 'b', 'c', 'a b c']);
        });
    });

    describe('charactersFromCodePointRange', (): void => {
        test('Should throw a TypeError for a non-integer start', (): void => {
            expect(nonIntegerCodePointInputs.filter((input: unknown): boolean => {
                return !throwsError((): void => {
                    charactersFromCodePointRange(input as number, 0x41);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a RangeError for an out-of-range start', (): void => {
            expect(outOfRangeCodePointInputs.filter((input: number): boolean => {
                return !throwsError((): void => {
                    charactersFromCodePointRange(input, 0x41);
                }, RangeError);
            })).toEqual([]);
        });

        test('Should throw a TypeError for a non-integer end', (): void => {
            expect(nonIntegerCodePointInputs.filter((input: unknown): boolean => {
                return !throwsError((): void => {
                    charactersFromCodePointRange(0x41, input as number);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a RangeError for an out-of-range end', (): void => {
            expect(outOfRangeCodePointInputs.filter((input: number): boolean => {
                return !throwsError((): void => {
                    charactersFromCodePointRange(0x41, input);
                }, RangeError);
            })).toEqual([]);
        });

        test('Should return the characters in code point order', (): void => {
            expect(charactersFromCodePointRange(0x41, 0x43)).toEqual(['A', 'B', 'C']);
        });

        test('Should include both ends of the range', (): void => {
            expect(charactersFromCodePointRange(0x41, 0x41)).toEqual(['A']);
        });

        test('Should accept the first and last code points', (): void => {
            expect(charactersFromCodePointRange(0, 0)).toEqual(['\u0000']);
            expect(charactersFromCodePointRange(0x10FFFF, 0x10FFFF)).toEqual(['\u{10FFFF}']);
        });
    });

    describe('mixStrings', (): void => {
        test('Should throw a TypeError for an invalid inputsA', (): void => {
            expect(nonArrayInputs.filter((input: unknown): boolean => {
                return !throwsError((): void => {
                    mixStrings(input as string[], ['a']);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a TypeError for an invalid inputsB', (): void => {
            expect(nonArrayInputs.filter((input: unknown): boolean => {
                return !throwsError((): void => {
                    mixStrings(['a'], input as string[]);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a TypeError for an inputsA with non-string elements', (): void => {
            expect(nonStringElementInputs.filter((input: unknown[]): boolean => {
                return !throwsError((): void => {
                    mixStrings(input as string[], ['a']);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a TypeError for an inputsB with non-string elements', (): void => {
            expect(nonStringElementInputs.filter((input: unknown[]): boolean => {
                return !throwsError((): void => {
                    mixStrings(['a'], input as string[]);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should join each pair as AB, BA, ABA, and BAB', (): void => {
            expect(mixStrings(['a'], ['1'])).toEqual(['a1', '1a', 'a1a', '1a1']);
        });

        test('Should remove duplicates', (): void => {
            expect(mixStrings(['a'], ['a'])).toEqual(['aa', 'aaa']);
        });

        test('Should return an empty array when either input is empty', (): void => {
            expect(mixStrings([], ['a'])).toEqual([]);
            expect(mixStrings(['a'], [])).toEqual([]);
        });
    });

    describe('pairStrings', (): void => {
        test('Should throw a TypeError for an invalid inputsA', (): void => {
            expect(nonArrayInputs.filter((input: unknown): boolean => {
                return !throwsError((): void => {
                    pairStrings(input as string[], ['a']);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a TypeError for an invalid inputsB', (): void => {
            expect(nonArrayInputs.filter((input: unknown): boolean => {
                return !throwsError((): void => {
                    pairStrings(['a'], input as string[]);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a TypeError for an inputsA with non-string elements', (): void => {
            expect(nonStringElementInputs.filter((input: unknown[]): boolean => {
                return !throwsError((): void => {
                    pairStrings(input as string[], ['a']);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should throw a TypeError for an inputsB with non-string elements', (): void => {
            expect(nonStringElementInputs.filter((input: unknown[]): boolean => {
                return !throwsError((): void => {
                    pairStrings(['a'], input as string[]);
                }, TypeError);
            })).toEqual([]);
        });

        test('Should join each pair in both orders', (): void => {
            expect(pairStrings(['a', 'b'], ['1'])).toEqual(['a1', '1a', 'b1', '1b']);
        });

        test('Should remove duplicates', (): void => {
            expect(pairStrings(['a'], ['a'])).toEqual(['aa']);
        });

        test('Should return an empty array when either input is empty', (): void => {
            expect(pairStrings([], ['a'])).toEqual([]);
            expect(pairStrings(['a'], [])).toEqual([]);
        });
    });
});
