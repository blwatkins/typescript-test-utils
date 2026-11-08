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

import { ErrorClass } from '../error';

/**
 * The base interface for a failure.
 *
 * @since 0.1.0
 */
export interface BaseFailure {
    /**
     * The input given to the method.
     *
     * @type {unknown}
     * @readonly
     * @since 0.1.0
     */
    readonly input: unknown;
}

/**
 * The value returned by the method.
 *
 * @since 0.1.0
 */
export interface Returned {
    /**
     * The value returned by the method.
     *
     * @type {unknown}
     * @readonly
     * @since 0.1.0
     */
    readonly actual: unknown;

    /**
     * The error thrown by the method.
     *
     * @remarks A method that returned a value cannot throw an error.
     *
     * @type {never}
     * @readonly
     * @since 0.1.0
     */
    readonly thrown?: never;
}

/**
 * The error thrown by the method.
 *
 * @since 0.1.0
 */
export interface Thrown {
    /**
     * The error thrown by the method.
     *
     * @type {unknown}
     * @readonly
     * @since 0.1.0
     */
    readonly thrown: unknown;

    /**
     * The value returned by the method.
     *
     * @remarks A method that threw an error cannot return a value.
     *
     * @type {never}
     * @readonly
     * @since 0.1.0
     */
    readonly actual?: never;
}

/**
 * A failure for an input that was expected to return a value, but returned a different value or threw an error.
 *
 * @since 0.1.0
 */
export type ValueFailure = BaseFailure & (Returned | Thrown) & {
    /**
     * The expected value returned by the method.
     *
     * @type {unknown}
     * @readonly
     * @since 0.1.0
     */
    readonly expected: unknown;

    /**
     * The expected error thrown by the method.
     *
     * @remarks A {@link ValueFailure} never has an expected error.
     *
     * @type {never}
     * @readonly
     * @since 0.1.0
     */
    readonly expectedError?: never;
};

/**
 * A failure for an input that was expected to throw an error, but returned a value or threw a different error.
 *
 * @since 0.1.0
 */
export type ErrorFailure = BaseFailure & (Returned | Thrown) & {
    /**
     * The expected error thrown by the method.
     *
     * @type {ErrorClass}
     * @readonly
     * @since 0.1.0
     */
    readonly expectedError: ErrorClass;

    /**
     * The expected value returned by the method.
     *
     * @remarks An {@link ErrorFailure} never has an expected value.
     *
     * @type {never}
     * @readonly
     * @since 0.1.0
     */
    readonly expected?: never;
};

/**
 * Represents a validation or matching failure encountered while processing an input value.
 *
 * @since 0.1.0
 */
export type Failure = ValueFailure | ErrorFailure;
