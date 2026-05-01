const canvas = document.getElementById('Bauplan');
const renderer = canvas.getContext('2d');

class Bauteil {
    constructor(Typ, Name, Zahlenwert, Einheit, xPosition, yPosition, Hoehe, Breite, Anschluss){
        this.Typ = Typ;
        this.Name = Name;
        this.Zahlenwert = Zahlenwert;
        this.Einheit = Einheit;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.Hoehe = Hoehe;
        this.Breite = Breite;
        this.Anschluss = Anschluss;
    }

    info () {
        return `${this.Typ} ${this.Name}: ${this.Zahlenwert} ${this.Einheit}`;
    }
}

class Widerstand extends Bauteil {
    constructor(Name, Zahlenwert, xPosition, yPosition) {
        super('Widerstand', Name, Zahlenwert, 'Ω', xPosition, yPosition, 20, 60, 10)
    }

    draw(renderer) {
        renderer.save();
        renderer.lineWidth = 2;

        const Breite = this.Breite;
        const Hoehe = this.Hoehe;
        const Anschluss = this.Anschluss

        //das Zeichen an sich
        renderer.strokeRect(
            Anschluss, 
            renderer.lineWidth,
            Breite,
            Hoehe
        );

        //Anschlüsse
        renderer.moveTo(0,20);
        renderer.lineTo(10, 20);
        renderer.stroke();
        renderer.moveTo(70,20);
        renderer.lineTo(80, 20);
        renderer.stroke();

        renderer.restore();
    }
}

class Kondensator extends Bauteil {
    constructor(Name, Zahlenwert, xPosition, yPosition) {
        super('Kondensator', Name, Zahlenwert, 'F', xPosition, yPosition)
    }
}

class Spule extends Bauteil {
    constructor(Name, Zahlenwert, xPosition, yPosition) {
        super('Spule', Name, Zahlenwert, 'H', xPosition, yPosition)
    }
}

const R1 = new Widerstand('R1', 1250, 10, 10);
const C1 = new Kondensator('C1', 1250, 10, 10);
const L1 = new Spule('L1', 1250, 10, 10);

console.log(R1.info());
console.log(C1.info());
console.log(L1.info());

R1.draw(renderer);