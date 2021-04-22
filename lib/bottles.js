import { downTo, capitalize } from './helpers';
class Bottles {
    constructor(verseTemplate = BottleVerse) {
        this.verseTemplate = verseTemplate;
    }

    song() {
        return this.verses(99, 0);
    }

    verses(upper, lower) {
        return downTo(upper, lower).map(i => this.verse(i)).join('\n');
    }

    verse(number) {
        return this.verseTemplate.lyrics(number);   
    }
}

class BottleVerse {
    
    constructor(number) {
        this.number = number;
        this.bottleNumber = number;
    }

    static lyrics(number) {
        return new BottleVerse(BottleNumber.for(number)).lyrics();
    }

    lyrics() {
        return capitalize(`${this.bottleNumber} of beer on the wall, `) +
        `${this.bottleNumber} of beer.\n` +
        `${this.bottleNumber.action()}, ` +
        `${this.bottleNumber.successor()} of beer on the wall.\n`;
    }
}

class BottleNumber {
    
    constructor(number) {
        this.number = number;
    }

    static for(number) {
        switch(number) {
            case 0:
                return new BottleNumber0(number);
            case 1:
                return new BottleNumber1(number);
            case 6:
                return new BottleNumber6(number);
            default:
                return new BottleNumber(number);
        }
    }

    successor() {
        return BottleNumber.for(this.number - 1);
    }

    action() {
        return `Take ${this.pronoun()} down and pass it around`;
    }

    quantity() {
        return this.number.toString();
    }

    pronoun() {
        return 'one';
    }

    container() {
        return 'bottles';
    }

    toString() {
        return `${this.quantity()} ${this.container()}`;
    }
}

class BottleNumber0 extends BottleNumber {
    
    successor() {
        return BottleNumber.for(99);
    }

    action() {
        return 'Go to the store and buy some more';
    }

    quantity() {
        return 'no more';
    }
}

class BottleNumber1 extends BottleNumber {
    
    pronoun() {
        return 'it';
    }

    container() {
        return 'bottle';
    }
}

class BottleNumber6 extends BottleNumber {
    quantity() {
        return '1';
    }

    container() {
        return "six-pack";
    }
}

export { Bottles };