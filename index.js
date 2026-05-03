const canvas = document.getElementById('Bauplan');
const renderer = canvas.getContext('2d');

class Bauteil {
    constructor(Typ, Name, Zahlenwert, Einheit, xPosition, yPosition, Breite,Hoehe, Anschluss){
        this.Typ = Typ;
        this.Name = Name;
        this.Zahlenwert = Zahlenwert;
        this.Einheit = Einheit;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.Breite = Breite;
        this.Hoehe = Hoehe;
        this.Anschluss = Anschluss;
    }

    info () {
        return `${this.Typ} ${this.Name}: ${this.Zahlenwert} ${this.Einheit}`;
    }
}

class Widerstand extends Bauteil {
    constructor(Name, Zahlenwert, xPosition, yPosition) {
        super('Widerstand', Name, Zahlenwert, 'Ω', xPosition, yPosition, 60, 20, 10)
    }

    draw(renderer) {
        renderer.save();

        renderer.lineWidth = 4;
        renderer.beginPath();

        const Breite = this.Breite;
        const Hoehe = this.Hoehe;
        const Anschluss = this.Anschluss;
        const center_Y_AnschlussPosition = (Hoehe / 2) + renderer.lineWidth;

        //zeichnet den Widerstand
        renderer.strokeRect(
            Anschluss, 
            renderer.lineWidth,
            Breite,
            Hoehe
        );
        renderer.stroke();

        //zeichnet Anschlüsse
        renderer.lineWidth = 1;
        renderer.beginPath();    
        renderer.moveTo(0,center_Y_AnschlussPosition);
        renderer.lineTo(Anschluss, center_Y_AnschlussPosition);
        renderer.stroke();
        renderer.moveTo(Anschluss + Breite, center_Y_AnschlussPosition);
        renderer.lineTo((2 * Anschluss) + Breite, center_Y_AnschlussPosition);
        renderer.stroke();

        renderer.restore();
    }
}

class Kondensator extends Bauteil {
    constructor(Name, Zahlenwert, xPosition, yPosition) {
        super('Kondensator', Name, Zahlenwert, 'F', xPosition, yPosition, 10, 40, 10)
    }

    draw(renderer){
        renderer.save();
        renderer.lineWidth = 6;
        renderer.beginPath();

        const Breite = this.Breite;
        const Hoehe = this.Hoehe;
        const Anschluss = this.Anschluss;
        const center_Y_AnschlussPosition = (Hoehe / 2) + renderer.lineWidth;

        //zeichnet den Kondensator
        renderer.moveTo(Anschluss, renderer.lineWidth);
        renderer.lineTo(Anschluss, Hoehe + renderer.lineWidth);
        renderer.moveTo(Anschluss + Breite, renderer.lineWidth);
        renderer.lineTo(Anschluss + Breite, Hoehe + renderer.lineWidth);
        renderer.stroke();

        //zeichnet Anschlüsse
        renderer.lineWidth = 1;
        renderer.beginPath();        
        renderer.moveTo(0,center_Y_AnschlussPosition);
        renderer.lineTo(Anschluss, center_Y_AnschlussPosition);
        renderer.stroke();
        renderer.moveTo(Anschluss + Breite, center_Y_AnschlussPosition);
        renderer.lineTo((2 * Anschluss) + Breite, center_Y_AnschlussPosition);
        renderer.stroke();

        renderer.restore();
    }
}

class Spule extends Bauteil {
    constructor(Name, Zahlenwert, xPosition, yPosition) {
        super('Spule', Name, Zahlenwert, 'H', xPosition, yPosition, 16, 20, 10)
    }

    draw(renderer){
        renderer.save();
        renderer.lineWidth = 2;
        renderer.beginPath();

        const Breite = this.Breite;
        const Hoehe = this.Hoehe;
        const Anschluss = this.Anschluss;
        const center_Y_AnschlussPosition = (Hoehe / 2) + renderer.lineWidth;

        //zeichnet der Spule
        for(let i = 0; i < 4; i++) {
            const mittelpunktXPosition = Anschluss + (i * Breite) + (Breite / 2);
            renderer.arc(
                mittelpunktXPosition,
                center_Y_AnschlussPosition,
                Breite / 2,
                Math.PI,
                0
            );
        };
        renderer.stroke();

        //zeichnet Anschlüsse
        renderer.lineWidth = 1;
        renderer.beginPath();        
        renderer.moveTo(0,center_Y_AnschlussPosition);
        renderer.lineTo(Anschluss, center_Y_AnschlussPosition);
        renderer.stroke();
        renderer.moveTo(Anschluss + (4 * Breite), center_Y_AnschlussPosition);
        renderer.lineTo((2 * Anschluss) + (4 * Breite), center_Y_AnschlussPosition);
        renderer.stroke();

        renderer.restore();
    }
}

class Reihenschaltung{
    constructor(Bauteil){
        this.Bauteil = Bauteil;       
    }

    draw(renderer){
        let naechsteBauteilXPosition = 0;
        const globaleYPositionAnschlüsse = 50;

        for (const Bauteil of this.Bauteil) {
            renderer.save();
            renderer.translate(naechsteBauteilXPosition, globaleYPositionAnschlüsse);
            Bauteil.draw(renderer);
            renderer.restore();

            naechsteBauteilXPosition = naechsteBauteilXPosition + ((2 * Bauteil.Anschluss) + Bauteil.Breite);
        }
    }
}

const R1 = new Widerstand('R1', 1250, 10, 10);
const C1 = new Kondensator('C1', 1250, 10, 10);
const L1 = new Spule('L1', 1250, 10, 10);

console.log(R1.info());
console.log(C1.info());
console.log(L1.info());


//R1.draw(renderer);
//C1.draw(renderer);
//L1.draw(renderer);
 
const renderReihenschaltung = new Reihenschaltung([R1, C1, L1]);
renderReihenschaltung.draw(renderer); 