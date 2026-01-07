// Symbol Library for Signal Decoding Animation System
// Multiple character sets for creating diverse "code" displays

export const symbolSets = {
  egyptian: ['𓂀', '𓆣', '𓆏', '𓃀', '𓄿', '𓅓', '𓆓', '𓇓', '𓈿', '𓉐', '𓊖'],
  runes: ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'],
  geometric: ['◈', '◉', '◯', '◐', '◑', '◒', '◓', '◔', '◕', '◖', '◗', '◘', '◙', '◚', '◛', '◜', '◝', '◞', '◟', '◠', '◡'],
  technical: ['⍊', '⍋', '⍌', '⍍', '⍎', '⍏', '⍐', '⍑', '⍒', '⍓', '⍔', '⍕', '⍖', '⍗', '⍘', '⍙', '⍚'],
  tibetan: ['༄', '༅', '༆', '༇', '༈', '༉', '༊', '༎', '༏', '༐', '༑', '༒'],
  alchemy: ['☿', '♄', '⚳', '♃', '♂', '☉', '♀', '☽', '⚕', '⚖', '⚗', '⚘', '⚙', '⚚'],
};

// Flatten all symbols into one array for easy access
export const allSymbols = Object.values(symbolSets).flat();

// Get symbols from a specific set
export function getSymbolsFromSet(setName: keyof typeof symbolSets): string[] {
  return symbolSets[setName] || [];
}

// Get a random symbol from a specific set
export function getRandomSymbolFromSet(setName: keyof typeof symbolSets): string {
  const symbols = getSymbolsFromSet(setName);
  return symbols[Math.floor(Math.random() * symbols.length)] || '';
}

// Get a random symbol from all sets
export function getRandomSymbol(): string {
  return allSymbols[Math.floor(Math.random() * allSymbols.length)] || '';
}

// Generate a line of random symbols
export function generateSymbolLine(
  length: number,
  activeSets: (keyof typeof symbolSets)[] = Object.keys(symbolSets) as (keyof typeof symbolSets)[]
): string {
  const line: string[] = [];
  for (let i = 0; i < length; i++) {
    const randomSet = activeSets[Math.floor(Math.random() * activeSets.length)];
    const symbol = getRandomSymbolFromSet(randomSet);
    line.push(symbol);
  }
  return line.join('');
}

// Code punctuation characters for code-like appearance - prioritizing recognizable code symbols
export const codePunctuation = ['=', '[', ']', '{', '}', '(', ')', '#', '@', '+', '-', '*', '/', '\\', '<', '>', '!', '&', '|', ':', ';', ',', '.', '%', '^', '~', '?'];

// Code-like patterns that look like programming statements
const codePatterns = {
  ifThen: ['if', 'then', 'else', 'when', 'while', 'for', 'case'],
  variables: ['var', 'let', 'const', 'set', 'get', 'val', 'data', 'result', 'input', 'output', 'state', 'config'],
  functions: ['func', 'fn', 'proc', 'call', 'exec', 'run', 'init', 'load', 'save', 'parse', 'encode', 'decode'],
  operators: ['=', '==', '!=', '>', '<', '>=', '<=', '&&', '||', '->', '=>', '::'],
  separators: ['.', ',', ';', ':', '|', '/', '\\'],
  brackets: ['(', ')', '[', ']', '{', '}'],
};

// Generate a code-like line with if/then statements, variables, and functions
export function generateCodeLikeLine(
  minLength: number = 15,
  maxLength: number = 45,
  activeSets: (keyof typeof symbolSets)[] = Object.keys(symbolSets) as (keyof typeof symbolSets)[]
): string {
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const line: string[] = [];
  
  // Randomly choose a pattern type
  const patternType = Math.random();
  
  if (patternType < 0.3) {
    // If/then pattern: if (condition) then action
    const ifWord = codePatterns.ifThen[Math.floor(Math.random() * codePatterns.ifThen.length)];
    const var1 = codePatterns.variables[Math.floor(Math.random() * codePatterns.variables.length)];
    const var2 = codePatterns.variables[Math.floor(Math.random() * codePatterns.variables.length)];
    const op = codePatterns.operators[Math.floor(Math.random() * codePatterns.operators.length)];
    const func = codePatterns.functions[Math.floor(Math.random() * codePatterns.functions.length)];
    
    // Build pattern: if var1 op var2 then func()
    const pattern = `${ifWord} ${var1}${getRandomSymbol()} ${op} ${var2}${getRandomSymbol()} ${func}${getRandomSymbol()}()`;
    const remaining = length - pattern.length;
    
    if (remaining > 0) {
      // Fill remaining with symbols
      for (let i = 0; i < remaining; i++) {
        const randomSet = activeSets[Math.floor(Math.random() * activeSets.length)];
        line.push(getRandomSymbolFromSet(randomSet));
      }
      return pattern + line.join('');
    }
    return pattern.substring(0, length);
  } else if (patternType < 0.6) {
    // Variable assignment: var = function()
    const var1 = codePatterns.variables[Math.floor(Math.random() * codePatterns.variables.length)];
    const func = codePatterns.functions[Math.floor(Math.random() * codePatterns.functions.length)];
    const var2 = codePatterns.variables[Math.floor(Math.random() * codePatterns.variables.length)];
    const op = codePatterns.operators[Math.floor(Math.random() * codePatterns.operators.length)];
    
    const pattern = `${var1}${getRandomSymbol()} ${op} ${func}${getRandomSymbol()}(${var2}${getRandomSymbol()})`;
    const remaining = length - pattern.length;
    
    if (remaining > 0) {
      for (let i = 0; i < remaining; i++) {
        const randomSet = activeSets[Math.floor(Math.random() * activeSets.length)];
        line.push(getRandomSymbolFromSet(randomSet));
      }
      return pattern + line.join('');
    }
    return pattern.substring(0, length);
  } else {
    // Mixed pattern with symbols and code-like elements
    let currentLength = 0;
    const parts: string[] = [];
    
    while (currentLength < length) {
      const partType = Math.random();
      let part = '';
      
      if (partType < 0.2 && currentLength < length - 5) {
        // Add a variable
        part = codePatterns.variables[Math.floor(Math.random() * codePatterns.variables.length)] + getRandomSymbol();
      } else if (partType < 0.4 && currentLength < length - 3) {
        // Add an operator
        part = codePatterns.operators[Math.floor(Math.random() * codePatterns.operators.length)];
      } else if (partType < 0.6 && currentLength < length - 4) {
        // Add a function
        part = codePatterns.functions[Math.floor(Math.random() * codePatterns.functions.length)] + getRandomSymbol();
      } else {
        // Add symbols
        const randomSet = activeSets[Math.floor(Math.random() * activeSets.length)];
        part = getRandomSymbolFromSet(randomSet);
      }
      
      if (currentLength + part.length <= length) {
        parts.push(part);
        currentLength += part.length;
      } else {
        // Fill remaining with symbols
        const remaining = length - currentLength;
        for (let i = 0; i < remaining; i++) {
          const randomSet = activeSets[Math.floor(Math.random() * activeSets.length)];
          parts.push(getRandomSymbolFromSet(randomSet));
        }
        break;
      }
    }
    
    return parts.join('');
  }
}

// Generate a longer string (1-20 chars) with symbols, spaces, and code punctuation
function generateCodeContent(
  minChars: number = 1,
  maxChars: number = 20,
  activeSets: (keyof typeof symbolSets)[] = Object.keys(symbolSets) as (keyof typeof symbolSets)[]
): string {
  const length = Math.floor(Math.random() * (maxChars - minChars + 1)) + minChars;
  const parts: string[] = [];
  
  for (let i = 0; i < length; i++) {
    const rand = Math.random();
    if (rand < 0.5) {
      // Symbol
      const randomSet = activeSets[Math.floor(Math.random() * activeSets.length)];
      parts.push(getRandomSymbolFromSet(randomSet));
    } else if (rand < 0.7) {
      // Space
      parts.push(' ');
    } else if (rand < 0.85) {
      // Code punctuation (non-bracket)
      const safePunct = ['=', '#', '@', '+', '-', '*', '/', '<', '>', '!', '&', '|', ':', ';', ',', '.', '%', '^'];
      parts.push(safePunct[Math.floor(Math.random() * safePunct.length)]);
    } else {
      // Newline occasionally (but we'll handle this carefully)
      if (i > 0 && i < length - 1 && Math.random() < 0.3) {
        parts.push('\n');
      } else {
        const randomSet = activeSets[Math.floor(Math.random() * activeSets.length)];
        parts.push(getRandomSymbolFromSet(randomSet));
      }
    }
  }
  
  return parts.join('');
}

// Generate a code-like line with symbols and code punctuation
export function generateCodeSymbolLine(
  minLength: number = 40,
  maxLength: number = 80,
  activeSets: (keyof typeof symbolSets)[] = Object.keys(symbolSets) as (keyof typeof symbolSets)[]
): string {
  const targetLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const parts: string[] = [];
  let currentLength = 0;
  
  // Code structure patterns with balanced brackets - using longer content strings
  const patterns = [
    // Function call: func(symbols)
    () => {
      const symbol1 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      const symbol2 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      return `${symbol1}(${symbol2})`;
    },
    // Array: [symbols, symbols]
    () => {
      const symbol1 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      const symbol2 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      return `[${symbol1},${symbol2}]`;
    },
    // Object: {symbol:symbol}
    () => {
      const symbol1 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      const symbol2 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      return `{${symbol1}:${symbol2}}`;
    },
    // Nested brackets: {[symbol]}
    () => {
      const symbol = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      return `{[${symbol}]}`;
    },
    // Assignment: symbol = symbol
    () => {
      const symbol1 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      const symbol2 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      return `${symbol1}=${symbol2}`;
    },
    // Multiple brackets: (symbol)[symbol]
    () => {
      const symbol1 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      const symbol2 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      return `(${symbol1})[${symbol2}]`;
    },
    // Array of objects: [{symbol}]
    () => {
      const symbol = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      return `[{${symbol}}]`;
    },
    // Function with params: func(symbol, symbol)
    () => {
      const symbol1 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      const symbol2 = getRandomSymbolFromSet(activeSets[Math.floor(Math.random() * activeSets.length)]);
      return `${symbol1}(${symbol2},${getRandomSymbol()})`;
    },
    // Object with multiple props: {symbol:symbol, symbol:symbol}
    () => {
      const s1 = getRandomSymbol();
      const s2 = getRandomSymbol();
      const s3 = getRandomSymbol();
      const s4 = getRandomSymbol();
      return `{${s1}:${s2},${s3}:${s4}}`;
    },
    // Brackets with operators: [symbol] + [symbol]
    () => {
      const symbol1 = getRandomSymbol();
      const symbol2 = getRandomSymbol();
      const ops = ['+', '-', '*', '=', '==', '=>', '->'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      return `[${symbol1}]${op}[${symbol2}]`;
    },
    // Hash/at patterns: #symbol @symbol
    () => {
      const symbol1 = getRandomSymbol();
      const symbol2 = getRandomSymbol();
      return `#${symbol1}@${symbol2}`;
    },
    // Nested function calls: func(symbol, func(symbol))
    () => {
      const s1 = getRandomSymbol();
      const s2 = getRandomSymbol();
      const s3 = getRandomSymbol();
      return `${s1}(${s2},${s3}(${getRandomSymbol()}))`;
    },
    // Array with multiple elements: [symbol, symbol, symbol]
    () => {
      const s1 = getRandomSymbol();
      const s2 = getRandomSymbol();
      const s3 = getRandomSymbol();
      return `[${s1},${s2},${s3}]`;
    },
    // Object with nested: {symbol: [symbol]}
    () => {
      const s1 = getRandomSymbol();
      const s2 = getRandomSymbol();
      return `{${s1}:[${s2}]}`;
    },
    // Assignment with brackets: symbol = [symbol]
    () => {
      const s1 = getRandomSymbol();
      const s2 = getRandomSymbol();
      return `${s1}=[${s2}]`;
    },
    // Function with object: func({symbol:symbol})
    () => {
      const s1 = getRandomSymbol();
      const s2 = getRandomSymbol();
      const s3 = getRandomSymbol();
      return `${s1}({${s2}:${s3}})`;
    },
  ];
  
  // Build line with structured code patterns - increased frequency for more code-like appearance
  while (currentLength < targetLength) {
    const patternType = Math.random();
    
    if (patternType < 0.55 && currentLength < targetLength - 5) {
      // 55% chance: Use a structured pattern with brackets/parentheses
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      const patternStr = pattern();
      
      if (currentLength + patternStr.length <= targetLength) {
        parts.push(patternStr);
        currentLength += patternStr.length;
        
        // Add separator or operator more frequently
        if (currentLength < targetLength - 1 && Math.random() < 0.4) {
          const separators = [';', ',', ':', '|', '=', '=>', '->', '=='];
          const sep = separators[Math.floor(Math.random() * separators.length)];
          parts.push(sep);
          currentLength += sep.length;
        }
      } else {
        break;
      }
    } else if (currentLength < targetLength - 2) {
      // Add single symbols or code punctuation to fill
      const rand = Math.random();
      if (rand < 0.4) {
        // Symbol
        const randomSet = activeSets[Math.floor(Math.random() * activeSets.length)];
        parts.push(getRandomSymbolFromSet(randomSet));
        currentLength += 1;
      } else {
        // Prioritize recognizable code punctuation
        const codePunct = ['=', '#', '@', '+', '-', '*', '/', '<', '>', '!', '&', '|', ':', ';', ',', '.', '%', '^'];
        parts.push(codePunct[Math.floor(Math.random() * codePunct.length)]);
        currentLength += 1;
      }
    } else {
      // Fill remaining with symbols
      while (currentLength < targetLength) {
        const randomSet = activeSets[Math.floor(Math.random() * activeSets.length)];
        parts.push(getRandomSymbolFromSet(randomSet));
        currentLength += 1;
      }
      break;
    }
  }
  
  return parts.join('');
}

