var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe_1 = OrderByPipe;
    /**
     * Check if a value is a string
     *
     * @param value
     */
    OrderByPipe.isString = function (value) {
        return typeof value === 'string' || value instanceof String;
    };
    /**
     * Sorts values ignoring the case
     *
     * @param a
     * @param b
     */
    OrderByPipe.caseInsensitiveSort = function (a, b) {
        if (OrderByPipe_1.isString(a) && OrderByPipe_1.isString(b)) {
            return a.localeCompare(b);
        }
        return OrderByPipe_1.defaultCompare(a, b);
    };
    /**
     * Default compare method
     *
     * @param a
     * @param b
     */
    OrderByPipe.defaultCompare = function (a, b) {
        if (a === b) {
            return 0;
        }
        if (a == null) {
            return 1;
        }
        if (b == null) {
            return -1;
        }
        return a > b ? 1 : -1;
    };
    /**
     * Parse expression, split into items
     * @param expression
     * @returns {string[]}
     */
    OrderByPipe.parseExpression = function (expression) {
        expression = expression.replace(/\[(\w+)\]/g, '.$1');
        expression = expression.replace(/^\./, '');
        return expression.split('.');
    };
    /**
     * Get value by expression
     *
     * @param object
     * @param expression
     * @returns {any}
     */
    OrderByPipe.getValue = function (object, expression) {
        for (var i = 0, n = expression.length; i < n; ++i) {
            var k = expression[i];
            if (!(k in object)) {
                return;
            }
            object = object[k];
        }
        return object;
    };
    /**
     * Set value by expression
     *
     * @param object
     * @param value
     * @param expression
     */
    OrderByPipe.setValue = function (object, value, expression) {
        var i;
        for (i = 0; i < expression.length - 1; i++) {
            object = object[expression[i]];
        }
        object[expression[i]] = value;
    };
    OrderByPipe.prototype.transform = function (value, expression, reverse, isCaseInsensitive, comparator) {
        if (isCaseInsensitive === void 0) { isCaseInsensitive = false; }
        if (!value) {
            return value;
        }
        if (Array.isArray(expression)) {
            return this.multiExpressionTransform(value, expression, reverse, isCaseInsensitive, comparator);
        }
        if (Array.isArray(value)) {
            return this.sortArray(value.slice(), expression, reverse, isCaseInsensitive, comparator);
        }
        if (typeof value === 'object') {
            return this.transformObject(Object.assign({}, value), expression, reverse, isCaseInsensitive, comparator);
        }
        return value;
    };
    /**
     * Sort array
     *
     * @param value
     * @param expression
     * @param reverse
     * @param isCaseInsensitive
     * @param comparator
     * @returns {any[]}
     */
    OrderByPipe.prototype.sortArray = function (value, expression, reverse, isCaseInsensitive, comparator) {
        var isDeepLink = expression && expression.indexOf('.') !== -1;
        if (isDeepLink) {
            expression = OrderByPipe_1.parseExpression(expression);
        }
        var compareFn;
        if (comparator && typeof comparator === 'function') {
            compareFn = comparator;
        }
        else {
            compareFn = isCaseInsensitive ? OrderByPipe_1.caseInsensitiveSort : OrderByPipe_1.defaultCompare;
        }
        var array = value.sort(function (a, b) {
            if (!expression) {
                return compareFn(a, b);
            }
            if (!isDeepLink) {
                if (a && b) {
                    return compareFn(a[expression], b[expression]);
                }
                return compareFn(a, b);
            }
            return compareFn(OrderByPipe_1.getValue(a, expression), OrderByPipe_1.getValue(b, expression));
        });
        if (reverse) {
            return array.reverse();
        }
        return array;
    };
    /**
     * Transform Object
     *
     * @param value
     * @param expression
     * @param reverse
     * @param isCaseInsensitive
     * @param comparator
     * @returns {any[]}
     */
    OrderByPipe.prototype.transformObject = function (value, expression, reverse, isCaseInsensitive, comparator) {
        var parsedExpression = OrderByPipe_1.parseExpression(expression);
        var lastPredicate = parsedExpression.pop();
        var oldValue = OrderByPipe_1.getValue(value, parsedExpression);
        if (!Array.isArray(oldValue)) {
            parsedExpression.push(lastPredicate);
            lastPredicate = null;
            oldValue = OrderByPipe_1.getValue(value, parsedExpression);
        }
        if (!oldValue) {
            return value;
        }
        OrderByPipe_1.setValue(value, this.transform(oldValue, lastPredicate, reverse, isCaseInsensitive), parsedExpression);
        return value;
    };
    /**
     * Apply multiple expressions
     *
     * @param value
     * @param {any[]} expressions
     * @param {boolean} reverse
     * @param {boolean} isCaseInsensitive
     * @param {Function} comparator
     * @returns {any}
     */
    OrderByPipe.prototype.multiExpressionTransform = function (value, expressions, reverse, isCaseInsensitive, comparator) {
        var _this = this;
        if (isCaseInsensitive === void 0) { isCaseInsensitive = false; }
        return expressions.reverse().reduce(function (result, expression) {
            return _this.transform(result, expression, reverse, isCaseInsensitive, comparator);
        }, value);
    };
    OrderByPipe = OrderByPipe_1 = __decorate([
        Pipe({
            name: 'orderBy',
            pure: false
        })
    ], OrderByPipe);
    return OrderByPipe;
    var OrderByPipe_1;
}());
export { OrderByPipe };
//# sourceMappingURL=order-by.js.map