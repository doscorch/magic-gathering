import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

////////////////////////////////
/// Gathering Structures
////////////////////////////////

////////////////////////////////
/// Guid
////////////////////////////////
const GUID = new class Guid {
    id: number;
    constructor() {
        this.id = 0;
    }
    create() {
        return ++this.id;
    }
}

////////////////////////////////
/// User
////////////////////////////////
export class User {
    id: string;	// A string denoting a unique id.
    email: string; // A string denoting the users email address. The email address must be valid.
    firstName: string; // A string denoting the users first name.
    lastName: string; // A string denoting the users last name.
    enabled: boolean; // A boolean denoting whether the user is enabled(true) or not(false).
    password: string; // A string denoting the users password.The password must be at least 10 characters in length, have at least one digit and one special character.Special characters are defined as any of the following: "!?@#$%^*-+".A password must not contain a whitespace character.
    role: string; // A string denoting the user role.There are only two possible values: "USER" and "ADMIN".
    decks: Array<Deck>; //	A list of Deck objects.
    constructor() {
        this.email = null;
    }
};

////////////////////////////////
/// Deck
////////////////////////////////
export class Deck {
    id: string; // A string denoting the decks id.
    owner: string; // A string denoting the owners id.
    cards: Array<CardSummary>; //	A list of CardSummary objects denoting the cards that are in the deck. This list cannot contain multiple card-summaries having the same multiverseid.
    name: string; // A string denoting the user-assigned name of the deck.
    description: string; //	A string denoting the description of the deck.
    constructor() {
    }
}

////////////////////////////////
/// CardSummary
////////////////////////////////
export class CardSummary {
    id: string; // A string denoting the api.magicthegathering.io id.
    multiverseid: string; //A string denoting the api.magicthegathering.io multiverse id.
    name: string; // A string denoting the api.magicthegathering.io name of the card.
    qty: number; //	An integer denoting the number of such cards in the deck.
    constructor() {
    }
}


////////////////////////////////
/// Error
////////////////////////////////
export class ERROR {
    msg: string;
    constructor(msg) {
        this.msg = msg; // A string describing the error that occured.
    }
}

// CSRF
export class CSRF {
    value: string;
    constuctor() {
        this.value = sessionStorage.getItem('X-CSRF');
    }
    get = function () {
        this.value = sessionStorage.getItem('X-CSRF');
        return this.value;
    }

    set = function (value) {
        sessionStorage.setItem('X-CSRF', value)
        this.value = value;
        return value;
    }
}

export enum Views {
    login,
    userList,
    user,
    deckList,
    deck,
    cardDetail
}
