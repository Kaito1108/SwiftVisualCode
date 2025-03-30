/**
 * JavaScript to Swift code converter
 * 
 * This utility provides functions to convert JavaScript code to Swift code.
 */

/**
 * Converts JavaScript code to Swift code
 * @param jsCode - JavaScript code to convert
 * @returns Converted Swift code
 */
export function convertJsToSwift(jsCode: string): string {
    if (!jsCode || jsCode.trim() === '') {
        return '';
    }

    let swiftCode = jsCode;

    // Replace variable declarations
    swiftCode = swiftCode.replace(/var\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);/g, 'var $1 = $2');
    swiftCode = swiftCode.replace(/let\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);/g, 'let $1 = $2');
    swiftCode = swiftCode.replace(/const\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);/g, 'let $1 = $2');

    // Remove semicolons
    swiftCode = swiftCode.replace(/;/g, '');

    // Convert function declarations
    swiftCode = swiftCode.replace(/function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g, 'func $1($2) {');

    // Convert arrow functions
    swiftCode = swiftCode.replace(/\(([^)]*)\)\s*=>\s*\{/g, 'func($1) {');

    // Convert console.log and window.alert to print
    swiftCode = swiftCode.replace(/(?:console\.log|window\.alert)\s*\(([^)]*)\)/g, 'print($1)');
    swiftCode = swiftCode.replace(/window\.alert\s*\(([^)]*)\)/g, 'print($1)');
    
    // Convert text_print block's generated code to print
    swiftCode = swiftCode.replace(/window\.alert\s*\(([^)]*)\)/g, 'print($1)');
    swiftCode = swiftCode.replace(/document\.write\s*\(([^)]*)\)/g, 'print($1)');
    swiftCode = swiftCode.replace(/alert\s*\(([^)]*)\)/g, 'print($1)');
    
    // Convert single quotes to double quotes in print statements
    swiftCode = swiftCode.replace(/print\('([^']*)'\)/g, 'print("$1")');
    
    // Convert string concatenation to string interpolation
    swiftCode = swiftCode.replace(/print\("([^"]*)"\s*\+\s*([^)]*)\)/g, 'print("$1\\($2)")');
    swiftCode = swiftCode.replace(/("[^"]*")\s*\+\s*([^\s;,)]+)/g, '$1 + "\\($2)"');
    swiftCode = swiftCode.replace(/([^\s;,+()]+)\s*\+\s*("[^"]*")/g, '"\\($1)" + $2');
    
    // Convert template literals
    const templateLiteralRegex = /`([^`]*(?:\${[^}]*}[^`]*)*)`/g;
    swiftCode = swiftCode.replace(templateLiteralRegex, (match, p1) => {
        // Replace ${...} with \(...)
        return '"' + p1.replace(/\${([^}]*)}/g, '\\($1)') + '"';
    });

    // Convert if statements
    swiftCode = swiftCode.replace(/if\s*\(([^)]*)\)\s*\{/g, 'if $1 {');
    swiftCode = swiftCode.replace(/}\s*else\s*if\s*\(([^)]*)\)\s*\{/g, '} else if $1 {');
    swiftCode = swiftCode.replace(/}\s*else\s*\{/g, '} else {');

    // Convert for loops
    swiftCode = swiftCode.replace(/for\s*\(let\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);\s*([^;]+);\s*([^)]*)\)\s*\{/g,
        'for var $1 = $2; $3; $4 {');
    // Convert for-in loops
    swiftCode = swiftCode.replace(/for\s*\(let\s+([a-zA-Z0-9_]+)\s+of\s+([^)]*)\)\s*\{/g, 'for $1 in $2 {');
    swiftCode = swiftCode.replace(/for\s*\(let\s+([a-zA-Z0-9_]+)\s+in\s+([^)]*)\)\s*\{/g, 'for $1 in $2 {');

    // Convert while loops
    swiftCode = swiftCode.replace(/while\s*\(([^)]*)\)\s*\{/g, 'while $1 {');
    swiftCode = swiftCode.replace(/do\s*\{([^}]*)\}\s*while\s*\(([^)]*)\);?/g, 'repeat {$1} while $2');

    // Convert array methods
    swiftCode = swiftCode.replace(/\.forEach\(([^=>]+)\s*=>\s*\{([^}]*)\}\)/g, '.forEach { $1 in$2}');
    swiftCode = swiftCode.replace(/\.map\(([^=>]+)\s*=>\s*\{([^}]*)\}\)/g, '.map { $1 in$2}');
    swiftCode = swiftCode.replace(/\.filter\(([^=>]+)\s*=>\s*\{([^}]*)\}\)/g, '.filter { $1 in$2}');
    swiftCode = swiftCode.replace(/\.forEach\(/g, '.forEach(');
    swiftCode = swiftCode.replace(/\.map\(/g, '.map(');
    swiftCode = swiftCode.replace(/\.filter\(/g, '.filter(');
    swiftCode = swiftCode.replace(/\.push\(/g, '.append(');
    swiftCode = swiftCode.replace(/\.pop\(\)/g, '.popLast()');
    swiftCode = swiftCode.replace(/\.shift\(\)/g, '.removeFirst()');
    swiftCode = swiftCode.replace(/\.unshift\(/g, '.insert(at: 0, ');
    swiftCode = swiftCode.replace(/\.join\(([^)]*)\)/g, '.joined(separator: $1)');
    swiftCode = swiftCode.replace(/\.indexOf\(/g, '.firstIndex(of: ');
    swiftCode = swiftCode.replace(/\.lastIndexOf\(/g, '.lastIndex(of: ');
    swiftCode = swiftCode.replace(/\.includes\(/g, '.contains(');
    swiftCode = swiftCode.replace(/\.slice\(([^,]+)(?:,\s*([^)]*))?\)/g, (match, start, end) => {
        if (end) {
            return `.prefix(${end}).suffix(from: ${start})`;
        }
        return `.suffix(from: ${start})`;
    });
    swiftCode = swiftCode.replace(/\.splice\(/g, '/* splice not directly supported in Swift - use removeSubrange or insert */');
    swiftCode = swiftCode.replace(/\.reverse\(\)/g, '.reversed()');
    swiftCode = swiftCode.replace(/\.sort\(\)/g, '.sorted()');
    
    // Convert array creation with values
    swiftCode = swiftCode.replace(/new Array\(([^)]*)\)/g, '[$1]');

    // Convert string methods
    swiftCode = swiftCode.replace(/\.substring\(/g, '.substring(');
    swiftCode = swiftCode.replace(/\.substr\(/g, '.substring(from: ');
    swiftCode = swiftCode.replace(/\.toUpperCase\(\)/g, '.uppercased()');
    swiftCode = swiftCode.replace(/\.toLowerCase\(\)/g, '.lowercased()');
    swiftCode = swiftCode.replace(/\.trim\(\)/g, '.trimmingCharacters(in: .whitespacesAndNewlines)');
    swiftCode = swiftCode.replace(/\.replace\(([^,]+),\s*([^)]+)\)/g, '.replacingOccurrences(of: $1, with: $2)');
    swiftCode = swiftCode.replace(/\.split\(([^)]+)\)/g, '.split(separator: $1)');
    swiftCode = swiftCode.replace(/\.charAt\(([^)]+)\)/g, '[$1]');
    swiftCode = swiftCode.replace(/\.slice\(([^)]+)\)/g, '.dropFirst($1)');
    swiftCode = swiftCode.replace(/\.startsWith\(([^)]+)\)/g, '.hasPrefix($1)');
    swiftCode = swiftCode.replace(/\.endsWith\(([^)]+)\)/g, '.hasSuffix($1)');

    // Convert string length property
    swiftCode = swiftCode.replace(/\.length/g, '.count');

    // Convert math functions
    swiftCode = swiftCode.replace(/Math\.abs\(/g, 'abs(');
    swiftCode = swiftCode.replace(/Math\.sqrt\(/g, 'sqrt(');
    swiftCode = swiftCode.replace(/Math\.pow\(([^,]+),\s*([^)]+)\)/g, 'pow($1, $2)');
    swiftCode = swiftCode.replace(/Math\.floor\(/g, 'floor(');
    swiftCode = swiftCode.replace(/Math\.ceil\(/g, 'ceil(');
    swiftCode = swiftCode.replace(/Math\.round\(/g, 'round(');
    swiftCode = swiftCode.replace(/Math\.random\(\)/g, 'Double.random(in: 0..<1)');
    swiftCode = swiftCode.replace(/Math\.min\(/g, 'min(');
    swiftCode = swiftCode.replace(/Math\.max\(/g, 'max(');
    swiftCode = swiftCode.replace(/Math\.sin\(/g, 'sin(');
    swiftCode = swiftCode.replace(/Math\.cos\(/g, 'cos(');
    swiftCode = swiftCode.replace(/Math\.tan\(/g, 'tan(');
    swiftCode = swiftCode.replace(/Math\.log\(/g, 'log(');
    swiftCode = swiftCode.replace(/Math\.log10\(/g, 'log10(');
    swiftCode = swiftCode.replace(/Math\.exp\(/g, 'exp(');
    swiftCode = swiftCode.replace(/Math\.PI/g, 'Double.pi');
    swiftCode = swiftCode.replace(/Math\.E/g, 'M_E');
    
    // Convert math_arithmetic block operations
    swiftCode = swiftCode.replace(/(\w+)\s*\*\*\s*(\w+)/g, 'pow($1, $2)');
    swiftCode = swiftCode.replace(/(\w+)\s*%\s*(\w+)/g, '$1.truncatingRemainder(dividingBy: $2)');

    // Convert array/object creation
    swiftCode = swiftCode.replace(/\[\]/g, '[]');
    swiftCode = swiftCode.replace(/new Array\(\)/g, '[]');
    swiftCode = swiftCode.replace(/\{\}/g, '[:]');
    swiftCode = swiftCode.replace(/new Object\(\)/g, '[:]');

    // Convert increment/decrement operators
    swiftCode = swiftCode.replace(/([a-zA-Z0-9_]+)\+\+/g, '$1 += 1');
    swiftCode = swiftCode.replace(/([a-zA-Z0-9_]+)--/g, '$1 -= 1');
    swiftCode = swiftCode.replace(/\+\+([a-zA-Z0-9_]+)/g, '$1 += 1');
    swiftCode = swiftCode.replace(/--([a-zA-Z0-9_]+)/g, '$1 -= 1');

    // Convert null/undefined checks
    swiftCode = swiftCode.replace(/null/g, 'nil');
    swiftCode = swiftCode.replace(/undefined/g, 'nil');
    swiftCode = swiftCode.replace(/([a-zA-Z0-9_\.]+)\s*===\s*null/g, '$1 == nil');
    swiftCode = swiftCode.replace(/([a-zA-Z0-9_\.]+)\s*!==\s*null/g, '$1 != nil');
    swiftCode = swiftCode.replace(/([a-zA-Z0-9_\.]+)\s*===\s*undefined/g, '$1 == nil');
    swiftCode = swiftCode.replace(/([a-zA-Z0-9_\.]+)\s*!==\s*undefined/g, '$1 != nil');

    // Convert equality operators
    swiftCode = swiftCode.replace(/===\s/g, '== ');
    swiftCode = swiftCode.replace(/!==\s/g, '!= ');
    swiftCode = swiftCode.replace(/==\s/g, '== ');
    swiftCode = swiftCode.replace(/!=\s/g, '!= ');
    
    // Convert logical operators
    swiftCode = swiftCode.replace(/&&/g, '&&');
    swiftCode = swiftCode.replace(/\|\|/g, '||');
    swiftCode = swiftCode.replace(/!/g, '!');
    
    // Convert ternary operator
    swiftCode = swiftCode.replace(/([^\s]+)\s*\?\s*([^:]+)\s*:\s*([^;\s]+)/g, '$1 ? $2 : $3');
    
    // Convert switch statements
    swiftCode = swiftCode.replace(/switch\s*\(([^)]*)\)\s*\{/g, 'switch $1 {');
    swiftCode = swiftCode.replace(/case\s+([^:]+):/g, 'case $1:');
    swiftCode = swiftCode.replace(/default:/g, 'default:');
    swiftCode = swiftCode.replace(/break;?/g, 'break');

    // Add Swift header comment
    swiftCode = '// Swift code converted from JavaScript\n' + swiftCode;

    return swiftCode;
}