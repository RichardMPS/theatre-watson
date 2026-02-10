import React, { useState } from 'react';
import { Calendar, Star, MapPin, Clock, Search, ExternalLink, Filter, Info, ChevronRight, Ticket, BookOpen, UtensilsCrossed, X } from 'lucide-react';

const TheatreTracker = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [visitDate, setVisitDate] = useState('');
  const [currentDate] = useState(new Date());
  const [showTermsModal, setShowTermsModal] = useState(false);

  const initialShows = [
    // --- LONG-RUNNING CLASSICS ---
    {
      id: 301,
      title: "The Mousetrap",
      venue: "St Martin's Theatre",
      locationType: "west-end",
      date: "1952-11-25",
      closingDate: "2027-12-31", // Open-ended
      type: "play",
      description: "Agatha Christie's classic whodunnit. The world's longest-running play.",
      bookingUrl: "https://uk.the-mousetrap.co.uk/"
    },
    {
      id: 302,
      title: "The Phantom of the Opera",
      venue: "His Majesty's Theatre",
      locationType: "west-end",
      date: "1986-10-09",
      closingDate: "2027-12-31", // Open-ended
      type: "musical",
      description: "Andrew Lloyd Webber's timeless tale of romance and obsession beneath the Paris Opera House.",
      bookingUrl: "https://www.thephantomoftheopera.com/",
      tripadvisorId: "3813104"
    },
    {
      id: 303,
      title: "Les Misérables",
      venue: "Sondheim Theatre",
      locationType: "west-end",
      date: "1985-10-08",
      closingDate: "2027-12-31", // Open-ended
      type: "musical",
      description: "Cameron Mackintosh's legendary production of the global musical phenomenon.",
      bookingUrl: "https://www.lesmis.com/"
    },
    {
      id: 304,
      title: "Mamma Mia!",
      venue: "Novello Theatre",
      locationType: "west-end",
      date: "1999-04-06",
      closingDate: "2027-12-31", // Open-ended
      type: "musical",
      description: "The ultimate feel-good show featuring the music of ABBA.",
      bookingUrl: "https://mamma-mia.com/"
    },
    {
      id: 305,
      title: "The Lion King",
      venue: "Lyceum Theatre",
      locationType: "west-end",
      date: "1999-10-19",
      closingDate: "2027-12-31", // Open-ended
      type: "musical",
      description: "Disney's spectacular musical features stunning puppetry and an unforgettable score by Elton John.",
      bookingUrl: "https://thelionking.co.uk/"
    },
    {
      id: 306,
      title: "Wicked",
      venue: "Apollo Victoria Theatre",
      locationType: "west-end",
      date: "2006-09-27",
      closingDate: "2027-12-31", // Open-ended
      type: "musical",
      description: "The untold true story of the Witches of Oz. A West End classic.",
      bookingUrl: "https://www.wickedthemusical.co.uk/"
    },
    {
      id: 307,
      title: "The Book of Mormon",
      venue: "Prince of Wales Theatre",
      locationType: "west-end",
      date: "2013-03-21",
      closingDate: "2027-12-31", // Open-ended
      type: "musical",
      description: "From the creators of South Park. Outrageous, hilarious, and surprisingly sweet.",
      bookingUrl: "https://thebookofmormonmusical.com/london/"
    },
    {
      id: 308,
      title: "The Play That Goes Wrong",
      venue: "Duchess Theatre",
      locationType: "west-end",
      date: "2014-09-14",
      closingDate: "2026-08-30",
      type: "play",
      description: "Mischief Theatre's classic comedy disaster where everything that can go wrong, does.",
      bookingUrl: "https://theplaythatgoeswrong.com/"
    },
    {
      id: 309,
      title: "Harry Potter and the Cursed Child",
      venue: "Palace Theatre",
      locationType: "west-end",
      date: "2016-07-30",
      closingDate: "2027-12-31", // Open-ended
      type: "play",
      description: "The magic continues in this spellbinding stage production.",
      bookingUrl: "https://uk.harrypottertheplay.com/"
    },
    {
      id: 310,
      title: "Hamilton",
      venue: "Victoria Palace Theatre",
      locationType: "west-end",
      date: "2017-12-21",
      closingDate: "2027-12-31", // Open-ended
      type: "musical",
      description: "Lin-Manuel Miranda's multi-award-winning cultural phenomenon telling the story of Alexander Hamilton.",
      bookingUrl: "https://hamiltonmusical.com/london/"
    },
    {
      id: 311,
      title: "Back to the Future: The Musical",
      venue: "Adelphi Theatre",
      locationType: "west-end",
      date: "2021-09-13",
      closingDate: "2027-12-31",
      type: "musical",
      description: "Great Scott! The movie classic is now a high-voltage musical experience.",
      bookingUrl: "https://www.backtothefuturemusical.com/london/"
    },
    {
      id: 312,
      title: "SIX",
      venue: "Vaudeville Theatre",
      locationType: "west-end",
      date: "2021-09-29",
      closingDate: "2027-01-31",
      type: "musical",
      description: "Divorced. Beheaded. LIVE! The six wives of Henry VIII remix five hundred years of historical heartbreak.",
      bookingUrl: "https://www.sixthemusical.com/london"
    },
    {
      id: 313,
      title: "Cabaret",
      venue: "Playhouse Theatre",
      locationType: "west-end",
      date: "2021-11-15",
      closingDate: "2026-09-26",
      type: "musical",
      description: "Welcome to the Kit Kat Club. The record-breaking, immersive production of Kander & Ebb's classic.",
      bookingUrl: "https://kitkat.club/london/"
    },
    {
      id: 314,
      title: "Moulin Rouge! The Musical",
      venue: "Piccadilly Theatre",
      locationType: "west-end",
      date: "2021-11-12",
      closingDate: "2026-02-21",
      type: "musical",
      description: "Enter a world of splendor and romance, of eye-popping excess, of glitz, grandeur, and glory.",
      bookingUrl: "https://www.moulinrougemusical.co.uk/"
    },
    {
      id: 315,
      title: "Operation Mincemeat",
      venue: "Fortune Theatre",
      locationType: "west-end",
      date: "2023-03-21",
      closingDate: "2026-06-30",
      type: "musical",
      description: "The true story of the oddest secret mission of WWII, told with live music.",
      bookingUrl: "https://www.operationmincemeat.com/"
    },
    {
      id: 316,
      title: "Stranger Things: The First Shadow",
      venue: "Phoenix Theatre",
      locationType: "west-end",
      date: "2023-11-17",
      closingDate: "2027-12-31",
      type: "play",
      description: "A gripping new prequel to the Netflix series, featuring stunning visual effects.",
      bookingUrl: "https://uk.strangerthingsonstage.com/"
    },
    {
      id: 317,
      title: "Hadestown",
      venue: "Lyric Theatre",
      locationType: "west-end",
      date: "2024-02-02",
      closingDate: "2026-12-31",
      type: "musical",
      description: "Tony Award-winning folk-opera retelling the myth of Orpheus and Eurydice.",
      bookingUrl: "https://hadestown.co.uk/"
    },
    {
      id: 318,
      title: "Disney's Hercules",
      venue: "Theatre Royal Drury Lane",
      locationType: "west-end",
      date: "2024-06-04",
      closingDate: "2026-03-31",
      type: "musical",
      description: "From Zero to Hero! Disney's animated classic comes to life on stage.",
      bookingUrl: "https://www.herculesthemusical.co.uk/"
    },
    {
      id: 319,
      title: "Starlight Express",
      venue: "Troubadour Wembley Park Theatre",
      locationType: "off-west-end",
      date: "2024-06-20",
      closingDate: "2026-05-03",
      type: "musical",
      description: "Andrew Lloyd Webber's roller-skating spectacular races back with a new production.",
      bookingUrl: "https://www.starlightexpress.com/"
    },
    {
      id: 320,
      title: "The Producers",
      venue: "Garrick Theatre",
      locationType: "west-end",
      date: "2025-08-30",
      closingDate: "2026-09-19",
      type: "musical",
      description: "Mel Brooks' hilarious musical about a down-on-his-luck Broadway producer and his scheme to make a fortune.",
      bookingUrl: "https://theproducersmusical.com/"
    },
    {
      id: 321,
      title: "Oliver!",
      venue: "Gielgud Theatre",
      locationType: "west-end",
      date: "2025-05-23",
      closingDate: "2026-06-27",
      type: "musical",
      description: "Cameron Mackintosh's spectacular new production of Lionel Bart's classic musical.",
      bookingUrl: "https://www.oliverthemusical.com/"
    },
    {
      id: 322,
      title: "Titanique",
      venue: "Criterion Theatre",
      locationType: "west-end",
      date: "2024-12-09",
      closingDate: "2026-06-07",
      type: "musical",
      description: "Olivier Award-winning musical comedy. Céline Dion hijacks a Titanic museum tour.",
      bookingUrl: "https://london.titaniquemusical.com/"
    },
    {
      id: 323,
      title: "Witness for the Prosecution",
      venue: "London County Hall",
      locationType: "off-west-end",
      date: "2024-01-01",
      closingDate: "2027-12-31",
      type: "play",
      description: "Agatha Christie's gripping courtroom drama staged in a magnificent real council chamber.",
      bookingUrl: "https://witnesscountyhall.com/"
    },
    {
      id: 375,
      title: "The Devil Wears Prada",
      venue: "Dominion Theatre",
      locationType: "west-end",
      date: "2024-10-24",
      closingDate: "2026-09-26",
      type: "musical",
      description: "Elton John's musical adaptation with Vanessa Williams as Miranda Priestly. The fastest-selling production in Dominion Theatre history.",
      bookingUrl: "https://devilwearspradamusical.com/"
    },
    {
      id: 376,
      title: "MJ The Musical",
      venue: "Prince Edward Theatre",
      locationType: "west-end",
      date: "2024-03-27",
      closingDate: "2026-02-28",
      type: "musical",
      description: "Olivier Award-winning musical celebrating Michael Jackson's artistry and the making of his 1992 Dangerous World Tour.",
      bookingUrl: "https://london.mjthemusical.com/"
    },

    // --- NOVEMBER 2025 OPENINGS ---
    {
      id: 101,
      title: "The Hunger Games: On Stage",
      venue: "Troubadour Canary Wharf",
      locationType: "off-west-end",
      date: "2025-11-13",
      closingDate: "2026-02-14",
      type: "play",
      description: "A dazzling, high-tech stage adaptation of the dystopian blockbuster.",
      bookingUrl: "https://tickets.thehungergamesonstage.com/tickets/series/thgostage",
      reviewUrl: "https://www.theguardian.com/stage/2025/nov/13/the-hunger-games-on-stage-review-thundering-fight-to-the-death-in-a-dazzling-dystopia"
    },
    {
      id: 102,
      title: "All My Sons",
      venue: "Wyndham's Theatre",
      locationType: "west-end",
      date: "2025-11-14",
      closingDate: "2026-03-07",
      type: "play",
      description: "Bryan Cranston stars in this towering revival of Arthur Miller's tragedy.",
      bookingUrl: "https://www.delfontmackintosh.co.uk/whats-on/all-my-sons",
      reviewUrl: "https://www.theguardian.com/stage/2025/nov/22/all-my-sons-review-bryan-cranston-marianne-jean-baptiste-paapa-essiedu-wyndhams-theatre-london"
    },
    {
      id: 106,
      title: "Ballet Shoes",
      venue: "National Theatre (Olivier)",
      locationType: "off-west-end",
      date: "2025-11-26",
      closingDate: "2026-02-21",
      type: "play",
      description: "A magical new adaptation of Noel Streatfeild's classic novel for the festive season.",
      bookingUrl: "https://www.nationaltheatre.org.uk/shows/ballet-shoes/",
      reviewUrl: "https://www.timeout.com/london/theatre/ballet-shoes-review-1"
    },
    {
      id: 104,
      title: "Paddington The Musical",
      venue: "Savoy Theatre",
      locationType: "west-end",
      date: "2025-11-30",
      closingDate: "2026-05-25",
      type: "musical",
      description: "The beloved bear arrives in the West End in a major new musical production.",
      bookingUrl: "https://www.thesavoytheatre.com/shows/paddington-the-musical"
    },
    {
      id: 328,
      title: "The Horse of Jenin",
      venue: "Bush Theatre",
      locationType: "fringe",
      date: "2025-11-20",
      closingDate: "2026-01-22",
      type: "play",
      description: "A powerful story of resilience and human connection in the face of conflict.",
      bookingUrl: "https://www.bushtheatre.co.uk/"
    },

    // --- DECEMBER 2025 ---
    {
      id: 1,
      title: "Into the Woods",
      venue: "Bridge Theatre",
      locationType: "off-west-end",
      date: "2025-12-02",
      closingDate: "2026-05-30",
      type: "musical",
      description: "Terry Gilliam co-directs this highly anticipated revival of Sondheim's fairytale masterpiece.",
      bookingUrl: "https://bridgetheatre.co.uk/whats-on/into-the-woods/",
      reviewUrl: "https://www.theguardian.com/stage/2025/dec/12/into-the-woods-review-bridge-theatre-london"
    },
    {
      id: 201,
      title: "Fallen Angels",
      venue: "Menier Chocolate Factory",
      locationType: "fringe",
      date: "2025-12-02",
      closingDate: "2026-02-21",
      type: "play",
      description: "A major revival of Noël Coward's comedy about two best friends and a shared ex-lover.",
      bookingUrl: "https://www.menierchocolatefactory.com/"
    },
    {
      id: 202,
      title: "Bengal Tiger at the Baghdad Zoo",
      venue: "Young Vic",
      locationType: "fringe",
      date: "2025-12-02",
      closingDate: "2026-01-31",
      type: "play",
      description: "David Threlfall stars in this Pulitzer-nominated comedy about two US marines and a tiger.",
      bookingUrl: "https://www.youngvic.org/"
    },
    {
      id: 203,
      title: "Indian Ink",
      venue: "Hampstead Theatre",
      locationType: "fringe",
      date: "2025-12-03",
      closingDate: "2026-01-31",
      type: "play",
      description: "Tom Stoppard's moving play about a poet in 1930s India, directed by Jonathan Kent.",
      bookingUrl: "https://www.hampsteadtheatre.com/"
    },
    {
      id: 2,
      title: "The Playboy of the Western World",
      venue: "National Theatre (Lyttelton)",
      locationType: "off-west-end",
      date: "2025-12-04",
      closingDate: "2026-02-28",
      type: "play",
      description: "A riotous new production of Synge's Irish classic starring Nicola Coughlan.",
      bookingUrl: "https://www.nationaltheatre.org.uk/shows/the-playboy-of-the-western-world/"
    },
    {
      id: 204,
      title: "When We Are Married",
      venue: "Donmar Warehouse",
      locationType: "fringe",
      date: "2025-12-06",
      closingDate: "2026-02-07",
      type: "play",
      description: "J.B. Priestley's classic northern comedy gets an intimate revival.",
      bookingUrl: "https://www.donmarwarehouse.com/"
    },
    {
      id: 332,
      title: "HMS Pinafore",
      venue: "London Coliseum",
      locationType: "west-end",
      date: "2025-12-04",
      closingDate: "2026-02-07",
      type: "musical",
      description: "ENO presents Gilbert and Sullivan's nautical comic opera.",
      bookingUrl: "https://londoncoliseum.org/"
    },
    {
      id: 333,
      title: "Paranormal Activity",
      venue: "Ambassadors Theatre",
      locationType: "west-end",
      date: "2025-12-05",
      closingDate: "2026-03-28",
      type: "play",
      description: "Supernatural thriller directed by Felix Barrett. An American couple relocates to London but ghosts follow.",
      bookingUrl: "https://www.atgtickets.com/shows/paranormal-activity/ambassadors-theatre/"
    },
    {
      id: 335,
      title: "Woman in Mind",
      venue: "Duke of York's Theatre",
      locationType: "west-end",
      date: "2025-12-10",
      closingDate: "2026-03-14",
      type: "play",
      description: "Sheridan Smith stars in Alan Ayckbourn's darkly comic masterpiece.",
      bookingUrl: "https://www.thedukeofyorks.com/woman-in-mind"
    },
    {
      id: 339,
      title: "KENREX",
      venue: "The Other Palace",
      locationType: "fringe",
      date: "2025-12-18",
      closingDate: "2026-02-01",
      type: "play",
      description: "True Crime meets Western in this foot-stomping thriller with a live Americana soundtrack.",
      bookingUrl: "https://theotherpalace.co.uk/kenrex/"
    },
    {
      id: 4,
      title: "Oh, Mary!",
      venue: "Trafalgar Theatre",
      locationType: "west-end",
      date: "2025-12-10",
      closingDate: "2026-04-25",
      type: "play",
      description: "The Broadway sensation reimagining Mary Todd Lincoln's life arrives in London.",
      bookingUrl: "https://trafalgartheatre.com/shows/oh-mary/"
    },
    {
      id: 5,
      title: "High Noon",
      venue: "Harold Pinter Theatre",
      locationType: "west-end",
      date: "2025-12-17",
      closingDate: "2026-03-14", // Approx based on typical limited run
      type: "play",
      description: "World premiere stage adaptation of the classic Western film.",
      bookingUrl: "https://www.atgtickets.com/shows/high-noon/harold-pinter-theatre/"
    },

    // --- 2026 ---
    {
      id: 341,
      title: "The Train Driver",
      venue: "Park Theatre",
      locationType: "fringe",
      date: "2026-01-14",
      closingDate: "2026-02-07",
      type: "play",
      description: "Athol Fugard's powerful drama about guilt, grief and redemption in post-apartheid South Africa.",
      bookingUrl: "https://parktheatre.co.uk/whats-on/"
    },
    {
      id: 342,
      title: "Safe Haven",
      venue: "Arcola Theatre",
      locationType: "fringe",
      date: "2026-01-14",
      closingDate: "2026-02-07",
      type: "play",
      description: "Chris Bowers' gripping exploration of sanctuary and belonging.",
      bookingUrl: "https://www.arcolatheatre.com/"
    },
    {
      id: 8,
      title: "The Tempest",
      venue: "Sam Wanamaker Playhouse",
      locationType: "off-west-end",
      date: "2026-01-17",
      closingDate: "2026-04-12",
      type: "play",
      description: "Shakespeare's final play performed in the intimate, candlelit indoor theatre.",
      bookingUrl: "https://www.shakespearesglobe.com/whats-on/the-tempest/"
    },
    {
      id: 9,
      title: "Mrs President",
      venue: "Charing Cross Theatre",
      locationType: "west-end",
      date: "2026-01-23",
      closingDate: "2026-03-08",
      type: "musical",
      description: "A new musical exploring the first woman to run for President of the United States.",
      bookingUrl: "https://charingcrosstheatre.co.uk/theatre/mrs-president"
    },
    {
      id: 10,
      title: "American Psycho",
      venue: "Almeida Theatre",
      locationType: "fringe",
      date: "2026-01-24",
      closingDate: "2026-03-14",
      type: "musical",
      description: "Matt Smith stars in this stylish, bloody musical satire of 1980s Wall Street.",
      bookingUrl: "https://almeida.co.uk/whats-on/american-psycho/"
    },
    {
      id: 11,
      title: "Arcadia",
      venue: "The Old Vic",
      locationType: "off-west-end",
      date: "2026-01-24",
      closingDate: "2026-03-21",
      type: "play",
      description: "Tom Stoppard's dazzling masterpiece of physics, gardening, and scandal returns.",
      bookingUrl: "https://www.oldvictheatre.com/stage/arcadia/"
    },
    {
      id: 343,
      title: "Maggots",
      venue: "Bush Theatre",
      locationType: "fringe",
      date: "2026-01-27",
      closingDate: "2026-03-07",
      type: "play",
      description: "A gripping new play by Farah Najib, directed by Jess Barton.",
      bookingUrl: "https://www.bushtheatre.co.uk/"
    },
    {
      id: 344,
      title: "The Rat Trap",
      venue: "Park Theatre",
      locationType: "fringe",
      date: "2026-01-28",
      closingDate: "2026-03-14",
      type: "play",
      description: "Noël Coward's first play receives a stylish period revival for its centenary year.",
      bookingUrl: "https://parktheatre.co.uk/whats-on/"
    },
    {
      id: 345,
      title: "Donbas",
      venue: "Theatre 503",
      locationType: "fringe",
      date: "2026-02-01",
      closingDate: "2026-02-28",
      type: "play",
      description: "Winner of the 2025 Theatre503 International Playwriting Award by Olga Braga.",
      bookingUrl: "https://theatre503.com/"
    },
    {
      id: 346,
      title: "Monstering the Rocketman",
      venue: "Arcola Theatre",
      locationType: "fringe",
      date: "2026-02-03",
      closingDate: "2026-02-21",
      type: "play",
      description: "Henry Naylor's compelling drama about ambition and consequence.",
      bookingUrl: "https://www.arcolatheatre.com/"
    },
    {
      id: 347,
      title: "Shadowlands",
      venue: "Aldwych Theatre",
      locationType: "west-end",
      date: "2026-02-05",
      closingDate: "2026-05-09",
      type: "play",
      description: "Hugh Bonneville stars as C.S. Lewis in this poignant drama about love and loss.",
      bookingUrl: "https://nederlander.co.uk/aldwych/"
    },
    {
      id: 348,
      title: "Unfortunate: The Untold Story of Ursula",
      venue: "The Other Palace",
      locationType: "fringe",
      date: "2026-02-06",
      closingDate: "2026-04-05",
      type: "musical",
      description: "The hit musical parody giving the Sea Witch her time to shine returns to London.",
      bookingUrl: "https://theotherpalace.co.uk/unfortunate/"
    },
    {
      id: 349,
      title: "Sweetmeats",
      venue: "Bush Theatre",
      locationType: "fringe",
      date: "2026-02-07",
      closingDate: "2026-03-21",
      type: "play",
      description: "Intimate love story between two South Asian elders by Karim Khan. Co-production with Tara Theatre.",
      bookingUrl: "https://www.bushtheatre.co.uk/"
    },
    {
      id: 350,
      title: "Seagulls",
      venue: "Kiln Theatre",
      locationType: "fringe",
      date: "2026-02-12",
      closingDate: "2026-03-21",
      type: "play",
      description: "A new, Black British retelling of Chekhov's iconic play The Seagull.",
      bookingUrl: "https://kilntheatre.com/"
    },
    {
      id: 12,
      title: "Man and Boy",
      venue: "National Theatre",
      locationType: "off-west-end",
      date: "2026-01-30",
      closingDate: "2026-03-14",
      type: "play",
      description: "Terence Rattigan's gripping thriller about finance and fatherhood.",
      bookingUrl: "https://www.nationaltheatre.org.uk/shows/man-and-boy/"
    },
    {
      id: 13,
      title: "I'm Sorry, Prime Minister",
      venue: "Apollo Theatre",
      locationType: "west-end",
      date: "2026-01-30",
      closingDate: "2026-05-09",
      type: "play",
      description: "The classic political sitcom characters return in a brand new stage comedy.",
      bookingUrl: "https://nimaxtheatres.com/shows/im-sorry-prime-minister/"
    },
    {
      id: 14,
      title: "Dracula",
      venue: "Noël Coward Theatre",
      locationType: "west-end",
      date: "2026-02-07",
      closingDate: "2026-05-31",
      type: "play",
      description: "A radical new one-woman adaptation starring Cynthia Erivo.",
      bookingUrl: "https://draculawestend.com/"
    },
    {
      id: 15,
      title: "Così fan tutte",
      venue: "London Coliseum",
      locationType: "west-end",
      date: "2026-02-06",
      closingDate: "2026-02-21",
      type: "musical", 
      description: "ENO's new production of Mozart's comedy of love and fidelity.",
      bookingUrl: "https://londoncoliseum.org/whats-on/cosi-fan-tutte/"
    },
    {
      id: 206,
      title: "Broken Glass",
      venue: "Young Vic",
      locationType: "fringe",
      date: "2026-02-21",
      closingDate: "2026-04-18",
      type: "play",
      description: "Arthur Miller's powerful drama about a Jewish couple in 1930s Brooklyn.",
      bookingUrl: "https://www.youngvic.org/"
    },
    {
      id: 207,
      title: "The Holy Rosenbergs",
      venue: "Menier Chocolate Factory",
      locationType: "fringe",
      date: "2026-02-27",
      closingDate: "2026-05-02",
      type: "play",
      description: "A gripping family drama starring the Menier's 2026 season ensemble.",
      bookingUrl: "https://www.menierchocolatefactory.com/"
    },
    {
      id: 16,
      title: "Summerfolk",
      venue: "National Theatre",
      locationType: "off-west-end",
      date: "2026-03-06",
      closingDate: "2026-04-29",
      type: "play",
      description: "Maxim Gorky's portrait of a privileged class oblivious to the storm approaching.",
      bookingUrl: "https://www.nationaltheatre.org.uk/shows/summerfolk/"
    },
    {
      id: 377,
      title: "Teeth 'n' Smiles",
      venue: "Duke of York's Theatre",
      locationType: "west-end",
      date: "2026-03-13",
      closingDate: "2026-06-13",
      type: "play",
      description: "50th-anniversary revival of David Hare's play starring Rebecca Lucy Taylor (Self Esteem).",
      bookingUrl: "https://www.thedukeofyorks.com/"
    },
    {
      id: 378,
      title: "Claude Monet: The Immersive Musical",
      venue: "Charing Cross Theatre",
      locationType: "off-west-end",
      date: "2026-03-14",
      closingDate: "2026-06-28",
      type: "musical",
      description: "A new musical inspired by Monet's life and letters.",
      bookingUrl: "https://charingcrosstheatre.co.uk/"
    },
    {
      id: 351,
      title: "Aether",
      venue: "Jermyn Street Theatre",
      locationType: "fringe",
      date: "2026-03-16",
      closingDate: "2026-04-04",
      type: "play",
      description: "Emma Howlett's award-winning play exploring physics, faith, and magic.",
      bookingUrl: "https://www.jermynstreettheatre.co.uk/"
    },
    {
      id: 352,
      title: "Bird Grove",
      venue: "Hampstead Theatre",
      locationType: "fringe",
      date: "2026-02-13",
      closingDate: "2026-03-21",
      type: "play",
      description: "New play by Alexi Kaye Campbell about much-loved English writer George Eliot.",
      bookingUrl: "https://www.hampsteadtheatre.com/"
    },
    {
      id: 208,
      title: "Jaja’s African Hair Braiding",
      venue: "Lyric Hammersmith",
      locationType: "fringe",
      date: "2026-03-18",
      closingDate: "2026-04-25",
      type: "play",
      description: "The UK premiere of the Tony Award-winning Broadway hit comedy.",
      bookingUrl: "https://lyric.co.uk/"
    },
    {
      id: 17,
      title: "Kinky Boots",
      venue: "London Coliseum",
      locationType: "west-end",
      date: "2026-03-17",
      closingDate: "2026-07-11",
      type: "musical",
      description: "The high-kicking musical returns, starring Johannes Radebe as Lola.",
      bookingUrl: "https://londoncoliseum.org/whats-on/kinky-boots/"
    },
    {
      id: 18,
      title: "Avenue Q",
      venue: "Shaftesbury Theatre",
      locationType: "west-end",
      date: "2026-03-20",
      closingDate: "2026-08-29",
      type: "musical",
      description: "The puppet-filled, adult comedy musical makes a cheeky West End return.",
      bookingUrl: "https://tixtrack.shaftesburytheatre.com/tickets/series/AVEQ"
    },
    {
      id: 19,
      title: "Les Liaisons Dangereuses",
      venue: "National Theatre",
      locationType: "off-west-end",
      date: "2026-03-21",
      closingDate: "2026-06-06",
      type: "play",
      description: "A dangerous game of seduction and revenge in pre-revolutionary France.",
      bookingUrl: "https://www.nationaltheatre.org.uk/shows/les-liaisons-dangereuses/"
    },
    {
      id: 209,
      title: "Waitress",
      venue: "New Wimbledon Theatre",
      locationType: "fringe",
      date: "2026-03-28",
      closingDate: "2026-04-04",
      type: "musical",
      description: "The smash-hit musical about friendship, motherhood, and the magic of a well-made pie.",
      bookingUrl: "https://www.atgtickets.com/venues/new-wimbledon-theatre/"
    },
    {
      id: 353,
      title: "Dear Jack, Dear Louise",
      venue: "Arcola Theatre",
      locationType: "fringe",
      date: "2026-04-02",
      closingDate: "2026-05-02",
      type: "play",
      description: "A wartime correspondence between an army doctor and an aspiring actor.",
      bookingUrl: "https://www.arcolatheatre.com/"
    },
    {
      id: 354,
      title: "I Was a Teenage She-Devil",
      venue: "The Other Palace",
      locationType: "fringe",
      date: "2026-04-02",
      closingDate: "2026-04-26",
      type: "musical",
      description: "An outrageous 80s horror comedy rock musical about a wallflower turned rock goddess.",
      bookingUrl: "https://theotherpalace.co.uk/i-was-a-teenage-she-devil/"
    },
    {
      id: 355,
      title: "Heart Wall",
      venue: "Bush Theatre",
      locationType: "fringe",
      date: "2026-04-07",
      closingDate: "2026-05-16",
      type: "play",
      description: "Kit Withington's tender exploration of grief and memory, directed by Katie Greenall.",
      bookingUrl: "https://www.bushtheatre.co.uk/"
    },
    {
      id: 356,
      title: "Please Please Me",
      venue: "Kiln Theatre",
      locationType: "fringe",
      date: "2026-04-16",
      closingDate: "2026-05-23",
      type: "play",
      description: "World premiere about Brian Epstein and his contribution to making The Beatles.",
      bookingUrl: "https://kilntheatre.com/"
    },
    {
      id: 20,
      title: "Grace Pervades",
      venue: "Theatre Royal Haymarket",
      locationType: "west-end",
      date: "2026-04-24",
      closingDate: "2026-07-11",
      type: "play",
      description: "Ralph Fiennes stars in this new play about the Victorian theatre legends.",
      bookingUrl: "https://trh.co.uk/whatson/grace-pervades/"
    },
    {
      id: 210,
      title: "The Karate Kid The Musical",
      venue: "New Wimbledon Theatre",
      locationType: "fringe",
      date: "2026-04-28",
      closingDate: "2026-05-09",
      type: "musical",
      description: "The world premiere UK tour of the musical based on the classic film kicks off.",
      bookingUrl: "https://www.atgtickets.com/venues/new-wimbledon-theatre/"
    },
    {
      id: 357,
      title: "Quartet in Autumn",
      venue: "Arcola Theatre",
      locationType: "fringe",
      date: "2026-05-07",
      closingDate: "2026-06-13",
      type: "play",
      description: "First stage adaptation of Barbara Pym's Booker-shortlisted novel, adapted by Samantha Harvey.",
      bookingUrl: "https://www.arcolatheatre.com/"
    },
    {
      id: 211,
      title: "An Ideal Husband",
      venue: "Lyric Hammersmith",
      locationType: "fringe",
      date: "2026-05-08",
      closingDate: "2026-06-06",
      type: "play",
      description: "Oscar Wilde's sharp political comedy returns to the Lyric after 100 years.",
      bookingUrl: "https://lyric.co.uk/"
    },
    {
      id: 379,
      title: "War Horse",
      venue: "National Theatre (Olivier)",
      locationType: "off-west-end",
      date: "2026-05-16",
      closingDate: "2026-10-31",
      type: "play",
      description: "The acclaimed National Theatre production returns with its stunning puppetry and powerful WWI story.",
      bookingUrl: "https://www.nationaltheatre.org.uk/"
    },
    {
      id: 358,
      title: "High Society",
      venue: "Barbican Theatre",
      locationType: "off-west-end",
      date: "2026-05-19",
      closingDate: "2026-07-11",
      type: "musical",
      description: "Helen George and Felicity Kendal star in this lavish new production of the Cole Porter classic.",
      bookingUrl: "https://www.barbican.org.uk/"
    },
    {
      id: 359,
      title: "Driftwood",
      venue: "Kiln Theatre",
      locationType: "fringe",
      date: "2026-06-03",
      closingDate: "2026-07-04",
      type: "play",
      description: "Royal Shakespeare Company's London premiere by Martina Laird, set in the Caribbean during the 1950s.",
      bookingUrl: "https://kilntheatre.com/"
    },
    {
      id: 21,
      title: "Beetlejuice",
      venue: "Prince Edward Theatre",
      locationType: "west-end",
      date: "2026-05-20",
      closingDate: "2027-04-17",
      type: "musical",
      description: "The ghost with the most finally arrives in London in this spectral musical comedy.",
      bookingUrl: "https://www.delfontmackintosh.co.uk/whats-on/beetlejuice"
    },
    {
      id: 22,
      title: "Pride The Musical",
      venue: "National Theatre",
      locationType: "off-west-end",
      date: "2026-06-11",
      closingDate: "2026-09-12",
      type: "musical",
      description: "Based on the hit film, celebrating the alliance between miners and the gay community.",
      bookingUrl: "https://www.nationaltheatre.org.uk/shows/pride/"
    },
    {
      id: 23,
      title: "Jesus Christ Superstar",
      venue: "London Palladium",
      locationType: "west-end",
      date: "2026-06-20",
      closingDate: "2026-09-05",
      type: "musical",
      description: "The iconic rock opera returns to the Palladium for a summer season.",
      bookingUrl: "https://lwtheatres.co.uk/whats-on/jesus-christ-superstar/"
    },
    {
      id: 24,
      title: "Cats",
      venue: "Regent's Park Open Air",
      locationType: "off-west-end",
      date: "2026-07-25",
      closingDate: "2026-09-12",
      type: "musical",
      description: "Andrew Lloyd Webber's feline phenomenon performed under the stars.",
      bookingUrl: "https://openairtheatre.com/production/cats"
    },
    {
      id: 212,
      title: "Kimberly Akimbo",
      venue: "Hampstead Theatre",
      locationType: "fringe",
      date: "2026-08-28",
      closingDate: "2026-11-07",
      type: "musical",
      description: "European premiere of the Tony Award-winning musical about a teen who ages too fast.",
      bookingUrl: "https://www.hampsteadtheatre.com/"
    },
    {
      id: 360,
      title: "The Last Five Years",
      venue: "London Palladium",
      locationType: "west-end",
      date: "2026-03-24",
      closingDate: "2026-03-29",
      type: "musical",
      description: "25th anniversary concert starring Rachel Zegler and Ben Platt in Jason Robert Brown's intimate masterpiece of love and heartbreak.",
      bookingUrl: "https://lwtheatres.co.uk/whats-on/the-last-five-years-tlp/"
    },
    {
      id: 361,
      title: "Romeo & Juliet",
      venue: "Harold Pinter Theatre",
      locationType: "west-end",
      date: "2026-03-16",
      closingDate: "2026-06-06",
      type: "play",
      description: "Sadie Sink and Noah Jupe star in Robert Icke's acclaimed adaptation of Shakespeare's timeless tragedy.",
      bookingUrl: "https://lwtickets.co.uk/whats-on/romeo-and-juliet/"
    },
    {
      id: 362,
      title: "Dirty Dancing",
      venue: "Capital Theatre",
      locationType: "west-end",
      date: "2026-10-16",
      closingDate: "2027-12-31",
      type: "musical",
      description: "The time of your life. Opening production at the brand-new Capital Theatre at Westfield London.",
      bookingUrl: "https://dirtydancingonstage.co.uk/london/"
    },
    {
      id: 363,
      title: "Our Town",
      venue: "Rose Theatre",
      locationType: "fringe",
      date: "2026-02-26",
      closingDate: "2026-03-28",
      type: "play",
      description: "Michael Sheen stars in this bold Welsh National Theatre reimagining of Thornton Wilder's Pulitzer Prize-winning masterpiece.",
      bookingUrl: "https://www.rosetheatre.org/whats-on/our-town-m74x"
    },
    {
      id: 364,
      title: "The Unlikely Pilgrimage of Harold Fry",
      venue: "Theatre Royal Haymarket",
      locationType: "west-end",
      date: "2026-04-24",
      closingDate: "2026-07-25",
      type: "musical",
      description: "The beloved novel comes to life in this heartwarming new musical about hope, redemption, and the journey of a lifetime.",
      bookingUrl: "https://lwtheatres.co.uk/"
    },
    {
      id: 365,
      title: "One Flew Over the Cuckoo's Nest",
      venue: "Almeida Theatre",
      locationType: "fringe",
      date: "2026-09-01",
      closingDate: "2026-11-14",
      type: "play",
      description: "Aaron Pierre and Giles Terera star in this powerful revival of Ken Kesey's classic tale of rebellion and freedom.",
      bookingUrl: "https://almeida.co.uk/"
    },
    {
      id: 366,
      title: "Ivanov",
      venue: "Barbican Theatre",
      locationType: "off-west-end",
      date: "2026-10-08",
      closingDate: "2026-12-05",
      type: "play",
      description: "Chris Pine makes his UK stage debut in Chekhov's darkly comic masterpiece about a man in crisis.",
      bookingUrl: "https://www.barbican.org.uk/"
    },
    {
      id: 367,
      title: "Inter Alia",
      venue: "National Theatre",
      locationType: "off-west-end",
      date: "2026-09-10",
      closingDate: "2026-11-21",
      type: "play",
      description: "Rosamund Pike stars in this gripping new political thriller exploring power, ambition, and moral compromise.",
      bookingUrl: "https://www.nationaltheatre.org.uk/"
    },
    {
      id: 368,
      title: "Man to Man",
      venue: "Royal Court Theatre",
      locationType: "off-west-end",
      date: "2026-10-20",
      closingDate: "2026-12-12",
      type: "play",
      description: "Tilda Swinton in a groundbreaking solo performance exploring identity, transformation, and what it means to be human.",
      bookingUrl: "https://royalcourttheatre.com/"
    },
    {
      id: 369,
      title: "1536",
      venue: "Kiln Theatre",
      locationType: "fringe",
      date: "2026-09-17",
      closingDate: "2026-11-07",
      type: "play",
      description: "Ava Pickett's 5-star new play reimagines the final days of Anne Boleyn with contemporary resonance.",
      bookingUrl: "https://kilntheatre.com/"
    },
    {
      id: 370,
      title: "Gerry and Sewell",
      venue: "Aldwych Theatre",
      locationType: "west-end",
      date: "2026-01-13",
      closingDate: "2026-04-11",
      type: "play",
      description: "A witty new comedy about an unlikely friendship that changes two lives forever.",
      bookingUrl: "https://lwtheatres.co.uk/"
    },
    {
      id: 371,
      title: "Already Perfect",
      venue: "King's Head Theatre",
      locationType: "fringe",
      date: "2026-01-09",
      closingDate: "2026-02-14",
      type: "musical",
      description: "Tony Award winner Levi Kreis's new musical exploring fame, self-acceptance, and the courage to be yourself.",
      bookingUrl: "https://kingsheadtheatre.com/"
    },
    {
      id: 372,
      title: "Cable Street",
      venue: "Marylebone Theatre",
      locationType: "off-west-end",
      date: "2026-01-16",
      closingDate: "2026-03-14",
      type: "play",
      description: "Following two sell-out seasons, this powerful drama about the Battle of Cable Street returns.",
      bookingUrl: "https://www.marylebonetheatre.com/"
    },
    {
      id: 373,
      title: "Guess How Much I Love You",
      venue: "Royal Court Theatre",
      locationType: "off-west-end",
      date: "2026-01-16",
      closingDate: "2026-03-07",
      type: "play",
      description: "World premiere by Luke Norris. A tender exploration of love, family, and what we leave behind.",
      bookingUrl: "https://royalcourttheatre.com/"
    },
    {
      id: 374,
      title: "Ballad Lines",
      venue: "Southwark Playhouse Elephant",
      locationType: "fringe",
      date: "2026-01-23",
      closingDate: "2026-03-21",
      type: "musical",
      description: "Finn Anderson's new folk musical weaving together tales of love, loss, and the ties that bind us.",
      bookingUrl: "https://southwarkplayhouse.co.uk/"
    },

    // --- PARK THEATRE ---,

    // --- JERMYN STREET THEATRE ---,

    // --- BUSH THEATRE ---,

    // --- ARCOLA THEATRE ---,

    // --- THEATRE 503 ---,

    // --- KILN THEATRE ---
  ];

  const [shows] = useState(initialShows);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper: Format Date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // Helper: Check if date is in the past
  const isPast = (dateString) => {
    return new Date(dateString) <= currentDate;
  };

  // Helper: Check if date is within 30 days
  const isApproaching = (dateString) => {
    const showDate = new Date(dateString);
    const diffTime = showDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  };

  // Helper: Get Review Link (Prioritise direct link, fallback to search)
  const getReviewLink = (show) => {
    if (show.reviewUrl) return show.reviewUrl;
    return `https://www.google.com/search?q=${encodeURIComponent(show.title + " London theatre review")}`;
  };

  // Helper: Google Maps Link
  const getMapsLink = (venue) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue + " theatre London")}`;
  };

  // Helper: TripAdvisor Restaurants Link
  const getRestaurantsLink = (show) => {
    // If TripAdvisor ID is available, build the proper RestaurantsNear URL
    if (show.tripadvisorId) {
      const venueSlug = show.venue.replace(/['']/g, '').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      return `https://www.tripadvisor.co.uk/RestaurantsNear-g186338-d${show.tripadvisorId}-${venueSlug}-London_England.html`;
    }
    // Fallback: Google Maps restaurant search (no redirect warnings)
    const searchQuery = `restaurants near ${show.venue} London`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
  };

  // Filter Logic
  const filteredShows = shows.filter(show => {
    // Hide shows that have ended (past closing date)
    const isStillRunning = new Date(show.closingDate) >= currentDate;
    if (!isStillRunning) return false;

    const typeMatch = typeFilter === 'all' || show.type === typeFilter;
    const locationMatch = locationFilter === 'all' || show.locationType === locationFilter;

    // Search query filtering (title or venue)
    const searchMatch = searchQuery === '' ||
      show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.venue.toLowerCase().includes(searchQuery.toLowerCase());

    // Date Filtering Logic
    let dateMatch = true;
    if (visitDate) {
      const visit = new Date(visitDate);
      const start = new Date(show.date);
      const end = new Date(show.closingDate);
      dateMatch = visit >= start && visit <= end;
    }

    return typeMatch && locationMatch && dateMatch && searchMatch;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));


  return (
    <div className="min-h-screen bg-slate-950 text-amber-50 selection:bg-amber-500 selection:text-white" style={{fontFamily: "'Inter', sans-serif"}}>
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 pb-12 pt-12 px-6 shadow-2xl relative overflow-hidden border-b border-amber-900/30">
        
        {/* Background Texture */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
            {/* Logo + Title Container */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">

              {/* BRANDING LOGO: Theatre Curtain Pin */}
              <div className="relative">
                 <div className="w-20 h-20 md:w-24 md:h-24 relative z-10 filter drop-shadow-xl flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                       <defs>
                          {/* Center stage glow */}
                          <radialGradient id="stageGlow" cx="50%" cy="40%" r="40%">
                             <stop offset="0%" stopColor="#fffbeb" />
                             <stop offset="40%" stopColor="#fef3c7" />
                             <stop offset="70%" stopColor="#fde68a" />
                             <stop offset="100%" stopColor="#fbbf24" />
                          </radialGradient>

                          {/* Curtain red gradients - left side */}
                          <linearGradient id="curtainLeft1" x1="0%" y1="0%" x2="100%" y2="0%">
                             <stop offset="0%" stopColor="#7f1d1d" />
                             <stop offset="30%" stopColor="#991b1b" />
                             <stop offset="60%" stopColor="#b91c1c" />
                             <stop offset="100%" stopColor="#7f1d1d" />
                          </linearGradient>

                          {/* Curtain red gradients - right side */}
                          <linearGradient id="curtainRight1" x1="0%" y1="0%" x2="100%" y2="0%">
                             <stop offset="0%" stopColor="#7f1d1d" />
                             <stop offset="40%" stopColor="#b91c1c" />
                             <stop offset="70%" stopColor="#991b1b" />
                             <stop offset="100%" stopColor="#7f1d1d" />
                          </linearGradient>

                          {/* Darker red for fold shadows */}
                          <linearGradient id="curtainDark" x1="0%" y1="0%" x2="0%" y2="100%">
                             <stop offset="0%" stopColor="#7f1d1d" />
                             <stop offset="100%" stopColor="#5f1616" />
                          </linearGradient>

                          {/* Lighter red for fold highlights */}
                          <linearGradient id="curtainLight" x1="0%" y1="0%" x2="0%" y2="100%">
                             <stop offset="0%" stopColor="#dc2626" />
                             <stop offset="100%" stopColor="#991b1b" />
                          </linearGradient>

                          {/* Orange border gradient */}
                          <linearGradient id="orangeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                             <stop offset="0%" stopColor="#f59e0b" />
                             <stop offset="50%" stopColor="#d97706" />
                             <stop offset="100%" stopColor="#b45309" />
                          </linearGradient>
                       </defs>

                       {/* Pin Shape Clip Path */}
                       <clipPath id="pinClip">
                          <path d="M50 2 C24 2 2 24 2 50 C2 76 50 98 50 98 C50 98 98 76 98 50 C98 24 76 2 50 2 Z" />
                       </clipPath>

                       <g clipPath="url(#pinClip)">
                          {/* Background stage glow */}
                          <rect width="100" height="100" fill="url(#stageGlow)" />

                          {/* Upper curtain valance */}
                          <ellipse cx="50" cy="0" rx="50" ry="8" fill="#7f1d1d" />
                          <ellipse cx="50" cy="0" rx="48" ry="6" fill="#991b1b" />

                          {/* Left curtain - multiple folds */}
                          <path d="M0 0 L12 0 Q10 25 8 50 Q6 65 0 80 Z" fill="url(#curtainDark)" />
                          <path d="M12 0 L20 0 Q18 25 16 50 Q14 65 8 80 L0 80 Q6 65 8 50 Q10 25 12 0 Z" fill="url(#curtainLeft1)" />
                          <path d="M20 0 L28 0 Q26 25 24 50 Q22 65 16 80 L8 80 Q14 65 16 50 Q18 25 20 0 Z" fill="url(#curtainDark)" />
                          <path d="M28 0 L36 0 Q34 25 32 50 Q30 65 24 80 L16 80 Q22 65 24 50 Q26 25 28 0 Z" fill="url(#curtainLight)" />
                          <path d="M36 0 L44 0 Q42 30 40 55 Q38 68 32 80 L24 80 Q30 65 32 50 Q34 25 36 0 Z" fill="url(#curtainLeft1)" />

                          {/* Left curtain tie-back rope */}
                          <path d="M44 0 Q42 35 35 60" fill="none" stroke="#92400e" strokeWidth="1.5" opacity="0.8" />
                          <ellipse cx="35" cy="60" rx="4" ry="5" fill="#92400e" opacity="0.6" />

                          {/* Right curtain - multiple folds (mirrored) */}
                          <path d="M100 0 L88 0 Q90 25 92 50 Q94 65 100 80 Z" fill="url(#curtainDark)" />
                          <path d="M88 0 L80 0 Q82 25 84 50 Q86 65 92 80 L100 80 Q94 65 92 50 Q90 25 88 0 Z" fill="url(#curtainRight1)" />
                          <path d="M80 0 L72 0 Q74 25 76 50 Q78 65 84 80 L92 80 Q86 65 84 50 Q82 25 80 0 Z" fill="url(#curtainDark)" />
                          <path d="M72 0 L64 0 Q66 25 68 50 Q70 65 76 80 L84 80 Q78 65 76 50 Q74 25 72 0 Z" fill="url(#curtainLight)" />
                          <path d="M64 0 L56 0 Q58 30 60 55 Q62 68 68 80 L76 80 Q70 65 68 50 Q66 25 64 0 Z" fill="url(#curtainRight1)" />

                          {/* Right curtain tie-back rope */}
                          <path d="M56 0 Q58 35 65 60" fill="none" stroke="#92400e" strokeWidth="1.5" opacity="0.8" />
                          <ellipse cx="65" cy="60" rx="4" ry="5" fill="#92400e" opacity="0.6" />

                          {/* Stage floor - dark wood */}
                          <rect x="0" y="80" width="100" height="20" fill="#1e293b" />
                          <rect x="0" y="80" width="100" height="3" fill="#334155" opacity="0.5" />

                          {/* Stage floor highlight edge */}
                          <path d="M0 80 Q50 78 100 80" fill="none" stroke="#d97706" strokeWidth="0.5" opacity="0.4" />
                       </g>

                       {/* Pin outer border - orange gradient */}
                       <path
                          d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 50 100 50 100 C50 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z"
                          fill="none"
                          stroke="url(#orangeBorder)"
                          strokeWidth="3"
                       />

                       {/* Inner border for depth */}
                       <path
                          d="M50 3 C24 3 3 24 3 50 C3 75.5 50 97 50 97 C50 97 97 75.5 97 50 C97 24 76 3 50 3 Z"
                          fill="none"
                          stroke="#d97706"
                          strokeWidth="1"
                          opacity="0.5"
                       />
                    </svg>
                 </div>
              </div>

              {/* Title + Subtitle Container */}
              <div className="flex flex-col items-center">
                <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold text-amber-500 tracking-wide uppercase" style={{fontFamily: "'Cinzel', serif", letterSpacing: '0.05em'}}>
                  THEATRE WATSON
                </h1>

                {/* Subtitle Badge */}
                <div className="mt-2 flex items-center space-x-2">
                   <div className="h-px w-8 bg-amber-500/50"></div>
                   <span className="text-amber-500 font-serif tracking-widest text-sm font-bold uppercase bg-slate-900/50 px-2 py-1 rounded border border-amber-900/50">London Edition</span>
                   <div className="h-px w-8 bg-amber-500/50"></div>
                </div>
              </div>

            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-col space-y-4 items-end w-full md:w-auto">

              {/* SEARCH BAR */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800/80 p-3 rounded-2xl border border-slate-700/50 hover:border-slate-600 focus-within:border-amber-500/50 focus-within:ring-2 focus-within:ring-amber-500/20 flex items-center gap-3 w-full md:w-auto shadow-xl shadow-black/50 transition-all">
                 <div className="bg-slate-800/80 p-2.5 rounded-xl text-slate-400">
                    <Search className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search by show or theatre..."
                      className="bg-transparent text-slate-200 text-sm focus:outline-none w-full placeholder:text-slate-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-4 hover:bg-slate-700 rounded-full p-1 transition-colors">
                        <X className="w-3 h-3 text-slate-400" />
                      </button>
                    )}
                 </div>
              </div>

              {/* DATE PICKER */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800/80 p-3 rounded-2xl border border-amber-500/30 hover:border-amber-500/50 focus-within:border-amber-500/60 focus-within:ring-2 focus-within:ring-amber-500/20 flex items-center gap-3 w-full md:w-auto shadow-xl shadow-amber-900/20 transition-all">
                 <div className="bg-slate-800/80 p-2.5 rounded-xl text-amber-500">
                    <Calendar className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                    <label className="text-xs text-amber-500/70 block ml-1 mb-0.5 font-medium uppercase tracking-wider">My Visit Date</label>
                    <div className="flex items-center">
                      <input 
                        type="date" 
                        className="bg-transparent text-slate-200 text-sm focus:outline-none w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                      />
                      {visitDate && (
                        <button onClick={() => setVisitDate('')} className="ml-2 hover:bg-slate-700 rounded-full p-1 transition-colors">
                          <X className="w-3 h-3 text-slate-400" />
                        </button>
                      )}
                    </div>
                 </div>
              </div>

              {/* Type Filter */}
              <div className="flex bg-gradient-to-br from-slate-900 to-slate-800/80 p-1.5 rounded-2xl backdrop-blur-sm border border-slate-800/80 shadow-xl shadow-black/30 w-full md:w-auto justify-end gap-1">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${typeFilter === 'all' ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-900 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setTypeFilter('musical')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${typeFilter === 'musical' ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-900 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'}`}
                >
                  Musicals
                </button>
                <button
                  onClick={() => setTypeFilter('play')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${typeFilter === 'play' ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-900 shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'}`}
                >
                  Plays
                </button>
              </div>

              {/* Location Filter */}
              <div className="flex bg-gradient-to-br from-slate-900 to-slate-800/80 p-1.5 rounded-2xl backdrop-blur-sm border border-slate-800/80 shadow-xl shadow-black/30 overflow-x-auto max-w-full no-scrollbar gap-1">
                <button
                  onClick={() => setLocationFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${locationFilter === 'all' ? 'bg-slate-700 text-white shadow-lg shadow-slate-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'}`}
                >
                  All Locations
                </button>
                <button
                  onClick={() => setLocationFilter('west-end')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${locationFilter === 'west-end' ? 'bg-slate-700 text-white shadow-lg shadow-slate-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'}`}
                >
                  West End
                </button>
                <button
                  onClick={() => setLocationFilter('off-west-end')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${locationFilter === 'off-west-end' ? 'bg-slate-700 text-white shadow-lg shadow-slate-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'}`}
                >
                  Off-West End
                </button>
                <button
                  onClick={() => setLocationFilter('fringe')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${locationFilter === 'fringe' ? 'bg-slate-700 text-white shadow-lg shadow-slate-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'}`}
                >
                  Fringe/Local
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Timeline Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Today is {formatDate(currentDate)}</span>
          </div>
          {visitDate && (
             <div className="text-sm font-medium text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
               Showing plays available on {formatDate(visitDate)}
             </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {filteredShows.map((show) => {
            const open = isPast(show.date);
            const urgent = isApproaching(show.date);
            const isVisitFilterActive = !!visitDate;

            return (
              <div
                key={show.id}
                className={`group relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/80 rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30
                  ${urgent && !isVisitFilterActive ? 'border-amber-500/50 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/10' : 'border-slate-800/80 hover:border-amber-500/50'}`}
                style={{
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Urgent Badge */}
                {urgent && !isVisitFilterActive && (
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-500 to-amber-600 text-slate-900 text-xs font-bold px-4 py-2 rounded-bl-2xl shadow-xl shadow-amber-500/30 z-10">
                    OPENS SOON
                  </div>
                )}

                <div className="flex flex-col md:flex-row">
                  {/* Date Column */}
                  <div className={`md:w-48 p-8 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-slate-800/50 ${open ? 'bg-slate-900/30' : 'bg-slate-900/50'}`}>
                    <span className="text-xs text-slate-400 uppercase tracking-wide mb-2">Opening Night</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-semibold text-amber-500 uppercase tracking-wider">{new Date(show.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-lg font-semibold text-amber-500">{new Date(show.date).getDate()}</span>
                      <span className="text-lg font-semibold text-amber-500">{new Date(show.date).getFullYear()}</span>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2 w-full">
                       <span className={`text-xs px-2 py-1 rounded-full border ${show.type === 'musical' ? 'border-purple-500/30 text-purple-300 bg-purple-500/10' : 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'}`}>
                         {show.type === 'musical' ? 'Musical' : 'Play'}
                       </span>
                       {/* Location Tag */}
                       <span className="text-[10px] px-2 py-1 rounded-full border border-indigo-500/30 text-indigo-300 bg-indigo-500/10 text-center">
                         {show.locationType === 'west-end' ? 'West End' : show.locationType === 'off-west-end' ? 'Off-West End' : 'Fringe'}
                       </span>
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors" style={{fontFamily: "'Playfair Display', serif"}}>{show.title}</h3>
                    
                    {/* Venue & Dining */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 mb-3">
                      <a 
                        href={getMapsLink(show.venue)}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-slate-400 hover:text-white transition-colors group/link"
                        title="Open in Google Maps"
                      >
                        <MapPin className="w-4 h-4 mr-1 text-amber-600" />
                        <span className="text-sm underline decoration-slate-700 group-hover/link:decoration-amber-500 underline-offset-2 transition-all">{show.venue}</span>
                      </a>

                      <a
                        href={getRestaurantsLink(show)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs font-medium text-slate-400 bg-slate-800/50 hover:bg-emerald-950/50 hover:text-emerald-400 border border-slate-700 hover:border-emerald-500/30 px-2 py-1 rounded-md transition-all"
                        title="Find restaurants nearby"
                      >
                        <UtensilsCrossed className="w-3 h-3 mr-1.5" />
                        Nearby Dining
                      </a>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-sm md:text-base" style={{fontFamily: "'Inter', sans-serif"}}>{show.description}</p>
                    
                    {isVisitFilterActive && (
                       <div className="mt-3 text-xs text-amber-500/70 font-mono">
                          Run: {formatDate(show.date)} — {formatDate(show.closingDate)}
                       </div>
                    )}
                  </div>

                  {/* Action Column */}
                  <div className="p-8 bg-slate-950/20 md:w-64 flex flex-col justify-center space-y-4 border-t md:border-t-0 md:border-l border-slate-800/50">

                    {/* Booking Button (Red Curtain Style) */}
                    <a
                       href={show.bookingUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center justify-center w-full bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white py-3.5 rounded-2xl transition-all font-bold shadow-xl shadow-red-900/30 hover:shadow-red-700/40 group-active:scale-95 border border-red-900/50 hover:-translate-y-1"
                       style={{fontFamily: "'Inter', sans-serif"}}
                    >
                       <Ticket className="w-4 h-4 mr-2" />
                       Book Tickets
                    </a>

                    {open ? (
                      /* Reviews Button */
                      <a
                        href={getReviewLink(show)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-3.5 rounded-2xl transition-all font-medium shadow-lg shadow-slate-900/30 hover:shadow-slate-700/40 group-active:scale-95 border border-slate-700 hover:border-slate-600 hover:-translate-y-1"
                        style={{fontFamily: "'Inter', sans-serif"}}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read Reviews
                      </a>
                    ) : null}

                    {/* Closes Date */}
                    <div className="text-center py-3 px-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 shadow-inner">
                      <div className="text-xs text-slate-400">
                        <span className="text-slate-500">Closes:</span>
                        <span className="text-slate-200 ml-2 font-medium">
                          {(() => {
                            const closingYear = new Date(show.closingDate).getFullYear();
                            if (closingYear >= 2027) {
                              return 'TBC';
                            }
                            return formatDate(show.closingDate);
                          })()}
                        </span>
                      </div>
                    </div>

                    {/* Secondary Status Text */}
                    <div className="text-center">
                      {open ? (
                        <div className="flex items-center justify-center text-emerald-500 text-xs font-medium">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Now Playing
                        </div>
                      ) : (
                         urgent && !isVisitFilterActive ? (
                           <span className="text-amber-500 text-xs font-medium animate-pulse">
                             Opening in {Math.ceil((new Date(show.date) - currentDate) / (1000 * 60 * 60 * 24))} days
                           </span>
                         ) : (
                           <span className="text-slate-500 text-xs">
                             {isVisitFilterActive ? 'Available on your visit' : (() => {
                               const closingYear = new Date(show.closingDate).getFullYear();
                               // If closing date is 2027 or later (used for open-ended shows), display TBC
                               if (closingYear >= 2027) {
                                 return 'Runs until TBC';
                               }
                               return `Runs until ${formatDate(show.closingDate)}`;
                             })()}
                           </span>
                         )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredShows.length === 0 && (
             <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800 border-dashed">
                <Info className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-300">No shows found</h3>
                <p className="text-slate-500 mt-2">
                  {visitDate ? `Nothing is scheduled for ${formatDate(visitDate)}.` : 'Try adjusting your filters.'}
                </p>
             </div>
          )}
        </div>

        {/* CSS Skyline Footer */}
        <div className="mt-20 pt-8 text-center text-slate-600 text-sm relative">
           {/* Skyline silhouette using borders and blocks */}
           <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center opacity-30 pointer-events-none overflow-hidden space-x-1">
              <div className="w-8 h-24 bg-slate-800"></div>
              <div className="w-12 h-12 bg-slate-800 rounded-t-full"></div>
              <div className="w-6 h-32 bg-slate-800"></div> {/* Shard-ish */}
              <div className="w-16 h-16 bg-slate-800"></div>
              <div className="w-10 h-10 bg-slate-800 rounded-t-lg"></div>
              <div className="w-4 h-20 bg-slate-800"></div>
              <div className="w-20 h-14 bg-slate-800 rounded-t-xl"></div>
           </div>
           <div className="relative z-10 border-t border-slate-800 pt-8 bg-slate-950">
             <p className="font-serif tracking-wider text-amber-500/50">THEATRE WATSON © 2025</p>
             <p className="mt-1 text-slate-700">Dates are subject to change by production companies.</p>
             <button
               onClick={() => setShowTermsModal(true)}
               className="mt-3 text-slate-600 hover:text-amber-500 text-xs underline decoration-slate-700 hover:decoration-amber-500 transition-colors"
             >
               Terms & Conditions
             </button>
           </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowTermsModal(false)}>
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-amber-500 font-serif">Terms & Conditions</h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] text-slate-300 space-y-6 text-sm leading-relaxed">

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">1. Acceptance of Terms</h3>
                <p>By accessing and using Theatre Watson (the "Website"), you accept and agree to be bound by the terms and conditions set forth below. If you do not agree to these terms, please do not use this Website.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">2. Information Accuracy Disclaimer</h3>
                <p className="mb-2">Theatre Watson provides information about London theatre productions, including show dates, venues, descriptions, and booking links. While we strive to maintain accurate and up-to-date information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                  <li>All dates, times, venues, and show details are subject to change without notice by production companies</li>
                  <li>We cannot guarantee the accuracy, completeness, or timeliness of any information displayed on this Website</li>
                  <li>Show dates marked as "TBC" (To Be Confirmed) are estimates and may be extended, shortened, or cancelled</li>
                  <li>Ticket availability is not guaranteed through any links provided</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">3. Limitation of Liability</h3>
                <p className="mb-2">The creator and operator of Theatre Watson shall not be held liable for:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                  <li>Any errors, inaccuracies, or omissions in the information provided</li>
                  <li>Any losses, damages, or expenses arising from the use of this Website</li>
                  <li>Missed performances, incorrect booking information, or travel arrangements based on information from this Website</li>
                  <li>Any issues arising from third-party websites, booking platforms, or external links</li>
                  <li>Changes to show schedules, cancellations, or closures made by theatre companies</li>
                </ul>
                <p className="mt-2 font-semibold text-slate-200">USE OF THIS WEBSITE IS ENTIRELY AT YOUR OWN RISK.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">4. Third-Party Links and Content</h3>
                <p className="mb-2">This Website contains links to external websites including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                  <li>Official theatre and production booking websites</li>
                  <li>Review platforms (e.g., The Guardian, TimeOut)</li>
                  <li>Google Maps and TripAdvisor for location and dining information</li>
                </ul>
                <p className="mt-2">We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party websites. You access these sites at your own risk.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">5. No Affiliation</h3>
                <p>Theatre Watson is an independent information resource and is not affiliated with, endorsed by, or connected to any theatre company, production company, ticket vendor, or venue mentioned on this Website.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">6. Booking and Ticketing</h3>
                <p>All ticket bookings are made directly with theatre box offices or official ticketing partners. Theatre Watson does not sell tickets, process payments, or handle bookings. All transactions are subject to the terms and conditions of the respective ticketing providers.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">7. User Responsibilities</h3>
                <p className="mb-2">Users of this Website agree to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                  <li>Verify all show information directly with official theatre sources before making travel or booking arrangements</li>
                  <li>Check official websites for the most current scheduling and availability</li>
                  <li>Use the Website for personal, non-commercial purposes only</li>
                  <li>Not reproduce, distribute, or republish content without permission</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">8. Intellectual Property</h3>
                <p>The design, layout, graphics, and compilation of content on Theatre Watson are protected by copyright. Show titles, descriptions, and related information are the property of their respective copyright holders.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">9. Privacy</h3>
                <p>Theatre Watson does not collect, store, or process personal data. The Website does not use cookies for tracking. Any data entered (such as visit dates for filtering) is processed locally in your browser and is not transmitted or stored.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">10. Modifications to Terms</h3>
                <p>We reserve the right to modify these Terms and Conditions at any time without prior notice. Continued use of the Website constitutes acceptance of any changes.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">11. Governing Law</h3>
                <p>These Terms and Conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
              </div>

              <div className="border-t border-slate-700 pt-6 mt-6">
                <p className="text-slate-400 text-xs italic">
                  <strong>IMPORTANT:</strong> Always verify show information, dates, and ticket availability directly with official theatre sources before making any commitments or travel arrangements. Theatre Watson is provided "AS IS" without warranty of any kind, express or implied.
                </p>
                <p className="text-slate-500 text-xs mt-4">
                  Last Updated: December 2025
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-800/50 p-4 border-t border-slate-700 flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="bg-amber-600 hover:bg-amber-500 text-slate-900 font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheatreTracker;