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

/**
 * A set of test inputs that share an expected outcome, grouped under a label that states why they belong together.
 *
 * @since 0.1.0
 */
export interface Scenario {
    /**
     * The reason the inputs belong together.
     *
     * @type {string}
     * @readonly
     * @since 0.1.0
     */
    readonly label: string;

    /**
     * The inputs that share the expected outcome.
     *
     * @type {unknown[]}
     * @readonly
     * @since 0.1.0
     */
    readonly inputs: unknown[];

    /**
     * The outcome expected for every input.
     *
     * @type {unknown}
     * @readonly
     * @since 0.1.0
     */
    readonly expected: unknown;

    /**
     * The error constructor expected to be thrown for every input.
     *
     * @type {ErrorConstructor}
     * @readonly
     * @since 0.1.0
     */
    readonly expectedError: ErrorConstructor;
}
