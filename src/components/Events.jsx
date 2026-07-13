import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/Events.css";

import eventDebate from "../assets/event-debate.webp";
import eventTva from "../assets/event-tvh.webp";
import eventTechnova from "../assets/event-technova.webp";
import eventNeural from "../assets/event-neural.webp";
import eventPixel from "../assets/event-pixel.webp";
import eventNexus from "../assets/event-nexus.webp";
import eventIdeathon from "../assets/event-ideathon.webp";
import bgVideoWebm from "../assets/bg-video.webm";
import bgVideoMp4 from "../assets/bg-video.mp4";
import bgVideoPoster from "../assets/bg-video-poster.webp";
import titleCard from "../assets/title card.webp";
import eyeOfAgamotto from "../assets/eye of agamotto.webp";
import eyeOpen from "../assets/eye_open.webp";
import eyeClose from "../assets/eye_close.webp";

const eventDatabase = [
  { 
    id: "debate",    
    badge: "Tech Saga",            
    title: "AI Technical Debate", 
    image: eventDebate,    
    prize: "₹5,000",   
    participants: "200+", 
    description: "An intense battle of minds pitching human logic against artificial intelligence algorithms.",
    details: {
      venue: "Pennai Hall + Classrooms",
      date: "22nd July 2026",
      objective: "To encourage students to critically examine the opportunities, challenges, and future implications of Artificial Intelligence through evidence-based discussions on contemporary AI topics while developing analytical thinking, research abilities, teamwork, and persuasive communication skills.",
      teamSize: "Exactly 5 members per team",
      prizeDetails: {
        winner: "₹3,000",
        runnerUp: "₹2,000"
      },
      format: {
        intro: "The competition consists of two rounds: Round 1 (Preliminary Debate) and Round 2 (Final Debate).",
        rounds: [
          {
            name: "Round 1: Preliminary Debate",
            details: [
              "Teams will participate in structured debates on assigned AI-related topics.",
              "The topic and side (For or Against) will be determined through a lucky draw before each debate.",
              "Preparation time: 5 minutes.",
              "Debate time: 20 minutes in total.",
              "Each team has a max of 10 minutes of speaking time, distributed among the five members as chosen.",
              "Suggested structure: Opening Arguments (3 mins), Rebuttals (5 mins), Closing Remarks (2 mins).",
              "Top two teams qualify for the finals based on judges' scores."
            ]
          },
          {
            name: "Round 2: Final Debate",
            details: [
              "Top two teams from Preliminary round advance.",
              "Finalists receive a new debate topic and fresh lucky draw.",
              "Team with the highest score in the Final Round is declared Winner."
            ]
          }
        ]
      },
      topics: [
        "Should AGI development be paused until proper regulations exist?",
        "Are LLMs truly reasoning systems or just pattern matchers?",
        "Is explainable AI more important than accuracy?",
        "Can AI replace software engineers?",
        "Should open-source AI be unrestricted?",
        "Will AI create more jobs than it destroys?",
        "Should AI development be regulated like nuclear technology?",
        "Can humans maintain control over superintelligent AI?"
      ],
      rules: [
        "Only college students are permitted to participate.",
        "Team size must be exactly 5 members.",
        "Teams must report to the venue at least 15 minutes before the event begins.",
        "Debate topics and sides will be assigned only through a lucky draw.",
        "Teams will be given exactly 5 minutes for preparation.",
        "Each team is allotted a total of 10 minutes of speaking time.",
        "At least three team members must speak during the debate.",
        "Electronic devices and internet access are prohibited during preparation and debate.",
        "Interruptions during opponent's speaking time are not permitted unless invited during rebuttal.",
        "Use of offensive, discriminatory, or inappropriate language will result in penalties or immediate disqualification.",
        "Teams exceeding the allotted speaking time incur a penalty of 1 mark per 30 seconds.",
        "Deliberately presenting false information may result in deductions.",
        "Judges' decisions are final and binding."
      ],
      judging: {
        criteria: [
          { name: "Technical Accuracy and Depth of Research", marks: 25 },
          { name: "Quality and Logical Strength of Arguments", marks: 20 },
          { name: "Rebuttal, Cross-Questioning, and Critical Thinking", marks: 20 },
          { name: "Evidence, Data, and Real-World Examples", marks: 15 },
          { name: "Communication, Delivery, and Persuasiveness", marks: 10 },
          { name: "Team Coordination and Equal Participation", marks: 10 }
        ],
        selection: "Final rankings will be based on cumulative evaluation by the judging panel in the Final Round. In case of a tie, judges will consider in order: (1) Higher score in Rebuttal and Critical Thinking, (2) Higher score in Technical Accuracy and Depth of Research, (3) Judges' collective decision based on overall impact."
      }
    }
  },
  { 
    id: "tva",       
    badge: "Quest Saga",            
    title: "TVA: Variant Hunt",   
    image: eventTva,       
    prize: "₹5,000",   
    participants: "500+", 
    description: "A high-speed multiverse treasure hunt across complex temporal nodes.",
    details: {
      venue: "5 Classrooms",
      date: "22nd July 2026",
      objective: "TVA: The Variant Hunt is a story-driven technical treasure hunt inspired by the concept of timeline management and multiversal exploration. Participants take on the role of Variants pursued by the TVA and must navigate through a series of challenges involving decoding, logical reasoning, technical problem-solving, and puzzle-solving to uncover the truth behind the Sacred Timeline.",
      teamSize: "Exactly 4 members per team",
      prizeDetails: {
        winner: "₹3,000",
        runnerUp: "₹2,000"
      },
      format: {
        intro: "The competition consists of five sequential rounds. All rounds must be completed in order, and teams that qualify in one round advance to the next.",
        rounds: [
          {
            name: "Round 1: Escape the TVA",
            details: [
              "Participants have been captured by the TVA for disrupting the Sacred Timeline and must escape TVA custody before they can uncover the truth."
            ]
          },
          {
            name: "Round 2: The Variant’s Evidence",
            details: [
              "After escaping TVA custody, participants discover evidence left behind by Sylvie, a Variant who has evaded the TVA for years."
            ]
          },
          {
            name: "Round 3: Repair the Tempad",
            details: [
              "Participants locate the tempad, but it has been corrupted and can no longer function correctly. Hence they have to fix it by modifying its firmware."
            ]
          },
          {
            name: "Round 4: Reach the End of Time",
            details: [
              "Upon reaching the End of Time, participants uncover a disturbing truth: the TVA is not protecting reality – it is controlling it. Multiple timeline branches now exist, and one of them leads to an unavoidable apocalypse."
            ]
          },
          {
            name: "Round 5: The Loom Protocol",
            details: [
              "After preventing the apocalypse, participants discover that the apocalypse was never the true threat. The TVA’s Temporal Loom continuously prunes timelines and forces reality into an endless cycle of control.",
              "Phase 1 – Assemble the Override Key: Teams gather all clues collected from previous rounds, arrange them in the correct sequence, decode the Master Password, and enter it into the Temporal Loom Control Panel.",
              "Phase 2 – The Final Choice: Once the Control Panel is unlocked, teams must choose one of two outcomes.",
              "Option A (Preserve the Sacred Timeline): TVA survives, timeline branching is prevented, order is maintained, and free will is sacrificed.",
              "Option B (Release the Timelines): TVA control is dismantled, infinite timelines are allowed to exist, every reality gains freedom, and possibility replaces control.",
              "Correct Ending: Participants are free to choose either option to clear the round. However, Option B is the appropriate answer and is only treated as decisive if two or more teams complete the game at the same time."
            ]
          }
        ]
      },
      topics: [
        "Required Items: Smartphone (to scan QR code)",
        "Required Items: Paper and Pen",
        "Duration: 70–90 minutes",
        "Team members must remain together throughout the event."
      ],
      rules: [
        "Each team shall consist of 4 members who must remain together throughout the event.",
        "Total duration is 70–90 minutes, and all rounds must be completed sequentially.",
        "Allowed materials: mobile phones for QR code scanning, calculators, and pen and paper for note-taking.",
        "Tampering with clues, QR codes, or event materials is prohibited.",
        "Receiving assistance from spectators or other teams, and sharing answers between teams, is prohibited.",
        "Using AI tools, internet searches, or external resources is not permitted unless explicitly allowed.",
        "Organizers’ and judges’ decisions shall be final and binding; any form of misconduct may result in disqualification."
      ],
      judging: {
        criteria: [
          { name: "Completion of all five rounds", marks: "Ideal" },
          { name: "Fallback: Team progressed the furthest", marks: "Fallback" },
          { name: "Following all event rules and regulations", marks: "Required" },
          { name: "Speed – fastest overall completion time", marks: "1st Tie-break" },
          { name: "Accuracy of solutions", marks: "2nd Tie-break" },
          { name: "Option chosen in final round (Option B)", marks: "Final Tie-break" }
        ],
        selection: "Winner Selection: To be declared the winner, a team must successfully complete all five rounds and follow all event rules and regulations. If no team completes all rounds within the time limit, the team that has advanced the furthest will be declared the winner. If two or more teams complete at the same time, the winner will be chosen based on the option they chose in Round 5 (Option B is correct). The first team to successfully complete the entire mission and unlock the true ending shall be declared the winner. Grand Title: 🏆 GUARDIANS OF THE MULTIVERSE 🏆"
      }
    }
  },
  { 
    id: "technova",  
    badge: "Innovation Challenge",  
    title: "Technova",            
    image: eventTechnova,  
    prize: "₹5,000",   
    participants: "350+", 
    description: "A technical innovation challenge containing tech rapid fires and Marvel-themed AI image generation.",
    details: {
      venue: "Security Lab",
      date: "22nd July 2026",
      objective: "To encourage students to enhance their technical knowledge, improve their quick-thinking abilities, and showcase their creativity through technology-based challenges, developing problem-solving skills, technical awareness, and innovative thinking.",
      teamSize: "1–2 participants per team",
      prizeDetails: {
        winner: "₹2,500",
        runnerUp: "₹1,500 (2nd) • ₹1,000 (3rd)"
      },
      format: {
        intro: "The competition consists of two rounds: Round 1 (Tech Rapid Fire) and Round 2 (Marvel AI Image Generation Challenge).",
        rounds: [
          {
            name: "Round 1: Tech Rapid Fire",
            details: [
              "Participants will answer a series of rapid-fire questions covering various technical domains.",
              "Covers domains such as AI, ML, Cyber Security, Programming, Data Science, Cloud, Networking, and Tech Trends.",
              "Tests technical knowledge, accuracy, and speed. Top-scoring teams qualify for the final round."
            ]
          },
          {
            name: "Round 2: Marvel AI Image Generation Challenge",
            details: [
              "Qualified participants will be given a Marvel-themed prompt or scenario.",
              "Using approved AI image-generation tools, participants must create an innovative and visually appealing image based on the given theme within the allotted time.",
              "Evaluated on creativity, originality, prompt engineering, and theme relevance."
            ]
          }
        ]
      },
      topics: [
        "Tech domains: AI, ML, Cybersecurity, Programming",
        "Data Science, Cloud Computing, Networking & Trends",
        "Marvel-themed prompt design and scenarios",
        "Prompt engineering and AI image generation tools"
      ],
      rules: [
        "Only college students are permitted to participate.",
        "Team size: 1–2 members.",
        "Participants must report to the venue on time.",
        "Mobile phones and internet access are prohibited during Round 1.",
        "Any malpractice or unfair means will result in immediate disqualification.",
        "Participants must use only the AI tools approved by the organizers during Round 2.",
        "Pre-generated images are not allowed.",
        "Judges' decisions are final and binding.",
        "Participants must adhere to all event timelines and instructions."
      ],
      judging: {
        criteria: [
          { name: "Technical Knowledge", marks: "25 pts" },
          { name: "Accuracy & Speed", marks: "20 pts" },
          { name: "Creativity & Innovation", marks: "25 pts" },
          { name: "Prompt Engineering Skills", marks: "15 pts" },
          { name: "Presentation & Explanation", marks: "15 pts" }
        ],
        selection: "Prizes: First Prize ₹2,500; Second Prize ₹1,500; Third Prize ₹1,000. Overall winner selection is determined by cumulative score out of 100 points across the technical and image generation rounds."
      }
    }
  },
  { 
    id: "neural",    
    badge: "Tech Saga",             
    title: "Neural Knockout",     
    image: eventNeural,    
    prize: "₹5,000",   
    participants: "300+", 
    description: "Neural Knockout is a premier high-speed, interactive tournament designed to merge rapid prompt engineering with creative public performance. Participating teams will leverage modern Artificial Intelligence to solve unconventional, humorous challenges and perform their AI-generated outputs live.",
    details: {
      venue: "Pega Lab",
      date: "22nd July 2026",
      objective: "To democratize AI interaction and prove that complex AI models can be utilized creatively by students without requiring deep coding backgrounds, while enhancing public speaking, quick ideation, and cultivating ethical prompting.",
      teamSize: "Refer to Rules / Organizers",
      prizeDetails: {
        winner: "₹2,500",
        runnerUp: "₹1,500 (2nd) • ₹1,000 (3rd)"
      },
      format: {
        intro: "The event is strictly structured to maximize audience engagement, bridging the gap between deep technical AI tools and pure, high-energy entertainment. The tournament consists of three main challenges:",
        rounds: [
          {
            name: "Challenge 1: The 'Meme-ify' Round (Visual)",
            details: [
              "Overview: Teams flex visual prompt engineering skills to turn ordinary campus life into something visually striking or comedic using AI.",
              "Example Topic: A standard photo of students studying in the campus library.",
              "Example Prompt: 'Transform this library scene into a glowing underground cave powered by a Bioluminescent Mycelium Ribbon, where the bookshelves are made of giant glowing mushrooms and the students are reading ancient holographic scrolls.'",
              "Judging focuses on prompt complexity and visual appeal."
            ]
          },
          {
            name: "Challenge 2: 'AI-Oke' (The Lyrics Round)",
            details: [
              "Overview: This round tests manipulation of LLM tone and style. Teams map highly technical concepts onto dramatic personas, creating instant comedy scripts for a designated performer.",
              "Example Topic: CPU's Fetch-Decode-Execute cycle.",
              "Example Prompt: 'Explain how a CPU works, but write it as an intense 90s underground rap battle where the ALU is battling the RAM.'",
              "Execution: A team member steps up to the mic and performs the generated script live."
            ]
          },
          {
            name: "Challenge 3: 'The Prompt-Off' (Final Battle)",
            details: [
              "Overview: The final teams face off live on stage with the exact same ridiculous premise. They have a strict 60-second window to generate a pitch using AI and deliver it.",
              "Example Topic: A pair of sunglasses that only work in the pitch dark.",
              "Example Prompt: 'Write a high-energy, 60-second infomercial script to sell a pair of sunglasses that only work in the dark. Make it sound like a luxury lifestyle brand for elite hackers.'",
              "Execution: Peak audience reception is measured by the official Clap-o-meter to crown the champion."
            ]
          }
        ]
      },
      topics: [
        "Approved AI Tools & Prompt Engineering",
        "Visual Generation & Stylistic Constraints",
        "Creative Lyrical & Script Writing with LLMs",
        "Live Improvisation & Stage Presence"
      ],
      rules: [
        "Participating teams will leverage modern AI models to solve challenges.",
        "Constraints on time and available tools must be strictly followed.",
        "Ethical prompting is strictly enforced: jailbreaking or generating inappropriate, offensive, or NSFW content will result in immediate disqualification.",
        "Live performance by a designated team member is mandatory for the performance rounds.",
        "Teams must manage their own generation times during the 60-second final battle.",
        "Organizers' and judges' decisions are final and binding."
      ],
      judging: {
        criteria: [
          { name: "R1: Creativity & Humor", marks: "40 pts" },
          { name: "R1: Prompt Complexity", marks: "30 pts" },
          { name: "R1: Visual Appeal", marks: "30 pts" },
          { name: "R2: Technical Accuracy", marks: "30 pts" },
          { name: "R2: Lyrical/Script Flow", marks: "30 pts" },
          { name: "R2: Live Performance", marks: "40 pts" },
          { name: "R3: Audience Reception (Clap-o-meter)", marks: "50 pts" },
          { name: "R3: Pitch Delivery & Energy", marks: "30 pts" },
          { name: "R3: Creative Integration", marks: "20 pts" }
        ],
        selection: "Each round has a 100-point total rubric. The team with the highest accumulated score across rounds is crowned the Neural Knockout champion."
      }
    }
  },
  { 
    id: "pixel",     
    badge: "Design Saga",           
    title: "Pixel Whisper",       
    image: eventPixel,     
    prize: "₹5,000",   
    participants: "250+", 
    description: "Where design parameters are generated purely by vocal commands. A test of coding logic, UI/UX recreation, and speech-driven teamwork.",
    details: {
      venue: "OOPS Lab",
      date: "22nd July 2026",
      objective: "To evaluate participants' coding aptitude, problem-solving abilities, communication skills, creativity, and UI/UX design proficiency through a combination of coding and collaborative design challenges.",
      teamSize: "Exactly 2 members per team",
      prizeDetails: {
        winner: "₹3,000",
        runnerUp: "₹2,000"
      },
      format: {
        intro: "The event takes place over 60 minutes in total, divided into two rounds. Teams must pass the first round to qualify for the second design round.",
        rounds: [
          {
            name: "Round 1: Inverse Coding Challenge (30 Minutes)",
            details: [
              "Participants are provided with the output of a program along with a problem statement.",
              "They must analyze the given output and develop the correct code that produces the specified result within the allotted time.",
              "Evaluated on correctness of code, logic/efficiency, successful output, and completion time."
            ]
          },
          {
            name: "Round 2: Design by Voice (30 Minutes)",
            details: [
              "One participant (Designer) is shown a UI screen, while the other participant (Builder) cannot view it.",
              "The Designer must verbally describe the interface, and the Builder must recreate it as accurately as possible using a design tool.",
              "The Designer is not allowed to touch the keyboard or mouse, and Builder cannot view the original interface."
            ]
          }
        ]
      },
      topics: [
        "Inverse coding and outputs analysis",
        "Code logic and algorithm efficiency",
        "Collaborative UI/UX design tools",
        "Verbal communication & team coordination under constraint"
      ],
      rules: [
        "Each team must consist of exactly 2 participants.",
        "Teams must successfully complete Round 1 to qualify for Round 2.",
        "During Round 2, only verbal communication is permitted between teammates.",
        "The Designer may view the original design but is not allowed to touch the keyboard or mouse.",
        "The Builder must recreate the design without viewing the original interface.",
        "Use of mobile phones, internet resources, AI tools, or external references is strictly prohibited.",
        "Any form of malpractice will result in immediate disqualification.",
        "Participants must use only the systems provided by the organizers.",
        "Teams must follow all instructions provided by event coordinators.",
        "The decision of the judges and organizing committee shall be final and binding."
      ],
      judging: {
        criteria: [
          { name: "Code Correctness, Logic & Output (R1)", marks: "50%" },
          { name: "UI Recreation Accuracy (R2)", marks: "25%" },
          { name: "Communication & Coordination (R2)", marks: "15%" },
          { name: "Creativity & Completion Time (R2)", marks: "10%" }
        ],
        selection: "Prizes: Winner receives ₹3,000; Runner-Up receives ₹2,000. Evaluation is based on logical coding correctness in Round 1 and the exact replication fidelity/coordination in Round 2."
      }
    }
  },
  { 
    id: "nexus",     
    badge: "Quest Saga",            
    title: "Nexus Grid",          
    image: eventNexus,     
    prize: "₹5,000",   
    participants: "400+", 
    description: "A high-speed cyber bingo event designed to test algorithmic speed and basic tech trivia.",
    details: {
      venue: "F6 Classroom",
      date: "22nd July 2026",
      objective: "To test participants' technical knowledge, logical thinking, and quick decision-making skills through an interactive Bingo-based challenge.",
      teamSize: "Individual Participant",
      prizeDetails: {
        winner: "₹2,500",
        runnerUp: "₹1,500 (2nd) • ₹1,000 (3rd)"
      },
      format: {
        intro: "Participants will be provided with a Bingo card containing technical terms, technologies, programming concepts, logos, and innovations. The event coordinator will present clues in the form of Technical Questions, Images and Logos, Technology Descriptions, Abbreviations and Acronyms, and Audio/Visual Hints. Participants must identify the correct answer and mark it on their Bingo card.",
        rounds: [
          {
            name: "Round 1: Technical Clues",
            details: [
              "Participants answer direct technical questions and mark the corresponding term on their Bingo card."
            ]
          },
          {
            name: "Round 2: Visual Bingo",
            details: [
              "Participants identify technologies, logos, icons, or concepts from images displayed on the screen."
            ]
          },
          {
            name: "Round 3: Rapid Fire Bingo",
            details: [
              "Quick technical clues are provided. Participants must rapidly identify and mark the correct answers before time runs out."
            ]
          }
        ]
      },
      topics: [
        "Required Items: Printed Bingo Cards (one different card for each player)",
        "Required Items: Pens or Pencils (so players can scratch off the answers)",
        "Equipment: Projector & Screen to display tech questions, logos, and rapid-fire clues",
        "Materials: Slide Deck/Presentation loaded with game questions and visual clues"
      ],
      rules: [
        "Only college students are permitted to participate.",
        "Each participant will receive a unique Bingo card.",
        "Mobile phones and external resources are not permitted.",
        "Participants must mark only the correct answers.",
        "A completed row, column, diagonal, or full house must be verified by the judges.",
        "Judges' decisions are final and binding.",
        "Participants must adhere to event timelines and instructions."
      ],
      judging: {
        criteria: [
          { name: "Accuracy of Markings", marks: "40 pts" },
          { name: "Speed of Completion", marks: "40 pts" },
          { name: "Number of Completed Patterns", marks: "20 pts" }
        ],
        selection: "Winner Selection: The participant who achieves the highest score or successfully completes the Full House in the shortest time will be declared the Winner. The next highest-scoring participant will be declared the Runner-Up."
      }
    }
  },
  { 
    id: "ideathon",  
    badge: "Flagship Saga",         
    title: "Ideathon",            
    image: eventIdeathon,  
    prize: "₹5,000", 
    participants: "600+", 
    description: "The crowning flagship event of Astra-X. Pitch revolutionary product concepts and present practical solutions to real-world problems.",
    details: {
      venue: "Networking Or Cybersecurity Lab",
      date: "22nd July 2026",
      objective: "To encourage students to ideate, innovate, and present practical solutions to real-world problems across technology, healthcare, finance, agriculture, education, sustainability, and social impact while demonstrating creativity, critical thinking, and problem-solving skills.",
      teamSize: "1–2 participants per team",
      prizeDetails: {
        winner: "₹3,000",
        runnerUp: "₹2,000"
      },
      format: {
        intro: "The competition consists of two rounds: Round 1 (Idea Sprint & Screening) and Round 2 (Final Pitch).",
        rounds: [
          {
            name: "Round 1: Idea Sprint & Screening",
            details: [
              "Teams will develop an original solution to a selected or assigned problem statement within the allotted time.",
              "Submit a one-page Idea Canvas covering the problem, solution, target users, feasibility, innovation, and expected impact.",
              "Judges will evaluate and shortlist the highest-scoring teams for the finals."
            ]
          },
          {
            name: "Round 2: Final Pitch",
            details: [
              "Shortlisted teams will deliver a 5-minute presentation live to the judging panel.",
              "Followed by up to 3 minutes of Q&A questions from the judges.",
              "Presentations should clearly explain the problem, proposed solution, implementation approach, uniqueness, and expected impact."
            ]
          }
        ]
      },
      topics: [
        "Technology & Deep Tech Solutions",
        "Healthcare & Assistive Devices",
        "FinTech & Sustainable Finance Platforms",
        "AgriTech, Education, and Social Impact",
        "Clean Energy & Sustainability Solutions"
      ],
      rules: [
        "Only college students are permitted to participate.",
        "Team size: 1–2 members.",
        "One idea submission per team.",
        "Cross-department teams are allowed.",
        "All ideas must be original and created by the participating team.",
        "Judges' decisions are final and binding.",
        "Participants must adhere to event timelines and instructions."
      ],
      judging: {
        criteria: [
          { name: "Innovation & Uniqueness of Idea", marks: "25%" },
          { name: "Feasibility & Practical Implementation", marks: "25%" },
          { name: "Expected Impact & Value Proposition", marks: "20%" },
          { name: "Quality of Presentation & Pitch", marks: "15%" },
          { name: "Response to Q&A Session", marks: "15%" }
        ],
        selection: "Shortlisted teams from Round 1 will pitch in Round 2. The final score is based on cumulative evaluation of innovation, presentation, and practicality."
      }
    }
  },
];

const PARTICLE_COUNT = 28;

function Events({ setActivePage, onToggleExpand }) {

  const containerRef    = useRef(null);
  const eyeWrapperRef   = useRef(null);
  const eyeOpenImgRef   = useRef(null);
  const eyeCloseImgRef  = useRef(null);
  const stageRef        = useRef(null);
  const runeRing1Ref    = useRef(null);
  const runeRing2Ref    = useRef(null);
  const infoCardRef     = useRef(null);
  const particleRefs    = useRef([]);

  const [currentIdx, setCurrentIdx]   = useState(0);
  const [displayIdx, setDisplayIdx]   = useState(0);
  const [infoOpen, setInfoOpen]       = useState(false);
  const [activeTab, setActiveTab]     = useState("overview");
  const isAnimatingRef  = useRef(false);
  const isInfoOpenRef   = useRef(false);

  // Counter
  const [hasCounted, setHasCounted]   = useState(false);
  const statsContainerRef = useRef(null);
  const numbersRef        = useRef([]);

  // Timeline
  const timelineRef    = useRef(null);
  const progressLineRef = useRef(null);
  const nodesRef        = useRef([]);

  // ── Settle/Clean setup ──
  useEffect(() => {
    // Keep rune rings static and aligned
    if (!runeRing1Ref.current || !runeRing2Ref.current) return;
    gsap.set([runeRing1Ref.current, runeRing2Ref.current], { rotation: 0 });
  }, []);

  // ── Particle burst ──
  const fireBurst = (intensity = 1) => {
    particleRefs.current.forEach(p => {
      if (!p) return;
      const angle = Math.random() * Math.PI * 2;
      const dist  = (80 + Math.random() * 220) * intensity;
      gsap.fromTo(p,
        { x: 0, y: 0, opacity: 1, scale: 1 + Math.random() * 0.6 },
        { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
          opacity: 0, scale: 0,
          duration: 0.75 + Math.random() * 0.55,
          ease: "power2.out",
          delay: Math.random() * 0.1,
          overwrite: "auto" }
      );
    });
  };

  // ── Toggle info card ──
  const openInfo = () => {
    const card = infoCardRef.current;
    if (!card) return;
    isInfoOpenRef.current = true;
    setInfoOpen(true);
    card.style.pointerEvents = "auto";
    onToggleExpand?.(true);

    // Animate the inner stage with a subtle pulse when opening info
    const stage = stageRef.current;
    if (stage) {
      gsap.to(stage, { scale: 1.05, duration: 0.25, ease: "power2.out",
        onComplete: () => gsap.to(stage, { scale: 1, duration: 0.35, ease: "back.out(1.7)" })
      });
    }

    // Slide card in from slightly below with a spring feel
    gsap.fromTo(card,
      { opacity: 0, y: 40, scale: 0.92, rotationX: 8 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0,
        duration: 0.55, ease: "back.out(1.4)",
        clearProps: "rotationX" }
    );

    // Particle burst for visual feedback
    fireBurst(0.7);
  };

  const closeInfo = () => {
    const card = infoCardRef.current;
    if (!card) return;

    gsap.to(card, {
      opacity: 0, y: 30, scale: 0.92, duration: 0.35, ease: "power3.in",
      onComplete: () => {
        card.style.pointerEvents = "none";
        isInfoOpenRef.current = false;
        setInfoOpen(false);
        setActiveTab("overview");
        gsap.set(card, { y: 0 });
        onToggleExpand?.(false);
      }
    });

    // Subtle shake on the eye when closing
    const wrapper = eyeWrapperRef.current;
    if (wrapper) {
      gsap.to(wrapper, {
        x: gsap.utils.random(-5, 5), y: gsap.utils.random(-3, 3),
        duration: 0.04, repeat: 5, yoyo: true, ease: "none",
        clearProps: "x,y"
      });
    }
  };

  const handleEyeClick = () => {
    if (isAnimatingRef.current) return;
    if (isInfoOpenRef.current) closeInfo();
    else openInfo();
  };

  // ── Main eye transition ──
  // Sequence: EYE CLOSES (image fades with it) → image SWAPS → EYE OPENS (new image reveals)
  const triggerTransition = (nextIndex) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const stage    = stageRef.current;
    const wrapper  = eyeWrapperRef.current;
    const rings    = [runeRing1Ref.current, runeRing2Ref.current];
    const card     = infoCardRef.current;
    const openImg  = eyeOpenImgRef.current;
    const closeImg = eyeCloseImgRef.current;

    const images     = stage ? Array.from(stage.querySelectorAll(".agamotto-inner-img")) : [];
    const currentImg = images[currentIdx];
    const nextImg    = images[nextIndex];
    const wasInfoOpen = isInfoOpenRef.current;

    // Prep: ensure next image is invisible and ready
    if (nextImg) gsap.set(nextImg, { opacity: 0, scale: 1, filter: "blur(0px) brightness(1)" });

    const CLOSE_DUR  = 0.38; // how long the eye takes to fully close
    const HOLD_DUR   = 0.08; // brief moment fully closed (image swaps here)
    const OPEN_DUR   = 0.42; // how long the eye takes to fully open
    const CLOSE_AT   = 0;    // when closing starts
    const SWAP_AT    = CLOSE_DUR + HOLD_DUR; // when the image swap happens
    const OPEN_AT    = SWAP_AT; // eye starts opening right as image swaps

    const tl = gsap.timeline({
      onComplete: () => { isAnimatingRef.current = false; }
    });

    // ━━ BEAT 1: EYE CLOSES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Temporarily elevate eye_close above the inner stage (z:8) so it fully covers it
    tl.set(closeImg, { zIndex: 9 }, CLOSE_AT);

    // Rings flare up
    tl.call(() => {
      fireBurst(1.2);
      rings.forEach(r => r?.classList.add("flare"));
    }, null, CLOSE_AT);
    tl.to(rings, { scale: 1.1, duration: CLOSE_DUR * 0.6, ease: "power2.out" }, CLOSE_AT);

    // Dismiss info card in sync with closing (if open)
    if (wasInfoOpen) {
      tl.to(card, { opacity: 0, y: 25, scale: 0.93, duration: CLOSE_DUR * 0.8, ease: "power2.in" }, CLOSE_AT);
    }

    // eye_open fades OUT → eye_close fades IN (the actual close blink)
    tl.to(openImg,  { opacity: 0, duration: CLOSE_DUR, ease: "power2.inOut" }, CLOSE_AT);
    tl.to(closeImg, { opacity: 1, duration: CLOSE_DUR, ease: "power2.inOut" }, CLOSE_AT);

    // The current event image darkens and shrinks with the closing eye
    if (currentImg) {
      tl.to(currentImg, {
        opacity: 0,
        scale: 0.88,
        filter: "blur(4px) brightness(0.3)",
        duration: CLOSE_DUR,
        ease: "power2.inOut"
      }, CLOSE_AT);
    }

    // Subtle wrapper squeeze (feels like mechanical iris closing)
    tl.to(wrapper, { scaleY: 0.92, scaleX: 1.04, duration: CLOSE_DUR, ease: "power2.inOut" }, CLOSE_AT);

    // ━━ BEAT 2: HARD SWAP (eye fully closed — eye_close covers everything) ━━
    tl.call(() => {
      setCurrentIdx(nextIndex);
      setDisplayIdx(nextIndex);
      setActiveTab("overview");
      if (wasInfoOpen) gsap.set(card, { y: 0 });
      // Snap next image into position while hidden behind eye_close
      if (nextImg) gsap.set(nextImg, { opacity: 1, scale: 0.9, filter: "blur(3px) brightness(0.5)" });
    }, null, SWAP_AT);

    // ━━ BEAT 3: EYE OPENS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // eye_close fades OUT → eye_open fades IN
    tl.to(closeImg, { opacity: 0, duration: OPEN_DUR, ease: "power2.inOut" }, OPEN_AT);
    tl.to(openImg,  { opacity: 1, duration: OPEN_DUR, ease: "power2.inOut" }, OPEN_AT);

    // Wrapper iris opens back — bouncy spring feel
    tl.to(wrapper, { scaleY: 1, scaleX: 1, duration: OPEN_DUR, ease: "back.out(1.6)" }, OPEN_AT);

    // New image blooms in as the eye opens — scales up and sharpens
    if (nextImg) {
      tl.to(nextImg, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) brightness(1)",
        duration: OPEN_DUR * 0.85,
        ease: "power2.out"
      }, OPEN_AT + OPEN_DUR * 0.15); // slight delay so image appears as the eye iris opens
    }

    // Rings settle with elastic snap and second burst
    tl.call(() => {
      fireBurst(0.8);
      rings.forEach(r => r?.classList.remove("flare"));
    }, null, OPEN_AT + OPEN_DUR * 0.5);
    tl.to(rings, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }, OPEN_AT + OPEN_DUR * 0.5);

    // Re-open info card after eye is open (if it was open before)
    if (wasInfoOpen) {
      tl.fromTo(card,
        { opacity: 0, y: 30, scale: 0.93 },
        { opacity: 1, y: 0,  scale: 1, duration: 0.45, ease: "back.out(1.4)" },
        OPEN_AT + OPEN_DUR * 0.6
      );
    }

    // Reset eye_close z-index back to normal (below stage) once transition is fully done
    tl.set(closeImg, { zIndex: 5 });
  };

  const handleNext = () => triggerTransition((currentIdx + 1) % eventDatabase.length);
  const handlePrev = () => triggerTransition((currentIdx - 1 + eventDatabase.length) % eventDatabase.length);

  const activeEvent = eventDatabase[displayIdx];

  // ── Timeline engine ──
  useEffect(() => {
    const tl        = timelineRef.current;
    const progress  = progressLineRef.current;
    const nodes     = nodesRef.current;
    if (!tl || !progress) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    nodes.forEach(n => { if (n) observer.observe(n); });

    const onScroll = () => {
      const rect = tl.getBoundingClientRect();
      const tp   = window.innerHeight * 0.6;
      if (rect.top < tp) {
        const pct = Math.min(Math.max(((tp - rect.top) / rect.height) * 100, 0), 100);
        progress.style.height = `${pct}%`;
        nodes.forEach(n => {
          if (!n) return;
          n.getBoundingClientRect().top < tp
            ? n.classList.add("active-marker", "visible")
            : n.classList.remove("active-marker");
        });
      } else {
        progress.style.height = "0%";
        nodes.forEach(n => { if (n) n.classList.remove("active-marker"); });
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  // ── Stats counter ──
  useEffect(() => {
    const el = statsContainerRef.current;
    if (!el || hasCounted) return;
    const count = () => {
      numbersRef.current.forEach(n => {
        if (!n) return;
        const target = parseInt(n.getAttribute("data-target"), 10);
        const inc    = target / (2000 / 16);
        let cur = 0;
        const id = setInterval(() => {
          cur += inc;
          if (cur >= target) {
            clearInterval(id);
            n.textContent = target >= 1000 ? target.toLocaleString("en-IN") : target;
            if (target === 3000 || target === 500) n.textContent += "+";
          } else {
            n.textContent = Math.floor(cur).toLocaleString("en-IN");
          }
        }, 16);
      });
    };
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting && !hasCounted) { count(); setHasCounted(true); } });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasCounted]);

  return (
    <div className="events-page-wrapper" ref={containerRef}>
      <div className="cosmic-bg">
        <video className="bg-video" autoPlay loop muted playsInline poster={bgVideoPoster}>
          <source src={bgVideoWebm} type="video/webm" />
          <source src={bgVideoMp4} type="video/mp4" />
        </video>
        <div className="cosmic-overlay"></div>
        <div className="nebula-red"></div>
        <div className="nebula-blue"></div>
      </div>

      <main>
        {/* ── Hero ── */}
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <div className="hero-title-container">
              <img src={titleCard} alt="Astra-X: Hall of Legends" className="hero-title-img" />
            </div>
            <p className="hero-subtitle">
              Step through the gateway. Prepare to enter the upcoming sagas of Astra-X and witness the high-tech battles, legendary challenges, and cosmic innovations that will define our new chapter.
            </p>
            <div className="hero-divider">
              <div className="line"></div>
              <div className="eye-of-agamotto">
                <img src={eyeOfAgamotto} alt="Eye of Agamotto" className="doctor-strange-eye" />
              </div>
              <div className="line"></div>
            </div>
          </div>
          
        </section>

        {/* ── Mirror Dimension ── */}
        <section id="events" className="events-section">
          <div className="section-header">
            <h2 className="section-title">THE MIRROR DIMENSION</h2>
            <p className="section-subtitle">Traverse the fractured realities of our upcoming national-level sagas.</p>
          </div>

          <div className="agamotto-showcase">
            <div className="agamotto-eye-container">
              <div className="agamotto-eye-wrapper" ref={eyeWrapperRef}>
                {/* Rune rings */}
                <div className="rune-ring rune-ring-1" ref={runeRing1Ref}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="rune-tick"
                      style={{ transform: `rotate(${i * 30}deg) translateY(-50%)` }} />
                  ))}
                </div>
                <div className="rune-ring rune-ring-2" ref={runeRing2Ref}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="rune-diamond"
                      style={{ transform: `rotate(${i * 45}deg) translateY(-50%)` }} />
                  ))}
                </div>

                {/* Event image — z:8 keeps it above eye frame images so the event image shows inside the eye */}
                <div
                  ref={stageRef}
                  className="agamotto-inner-stage"
                  onClick={handleEyeClick}
                  role="button"
                  tabIndex={0}
                  aria-label="View event details"
                  onKeyDown={e => e.key === "Enter" && handleEyeClick()}
                  style={{ zIndex: 8 }}
                >
                  {eventDatabase.map((ev, idx) => (
                    <img
                      key={ev.id}
                      src={ev.image}
                      alt={ev.title}
                      className="agamotto-inner-img"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: idx === currentIdx ? 1 : 0,
                        transform: "scale(1)",
                        willChange: "transform, opacity, filter",
                        pointerEvents: idx === currentIdx ? "auto" : "none"
                      }}
                    />
                  ))}
                </div>

                {/* Close image — hidden by default, shown only during nav transitions */}
                <img ref={eyeCloseImgRef} src={eyeClose} alt=""
                  className="agamotto-eye-img agamotto-close-img" aria-hidden="true" style={{ opacity: 0 }} />

                {/* Open image — visible by default */}
                <img ref={eyeOpenImgRef} src={eyeOpen} alt="Eye of Agamotto"
                  className="agamotto-eye-img agamotto-open-img" style={{ opacity: 1 }} />

                {/* Particle burst */}
                <div className="agamotto-particles" aria-hidden="true">
                  {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
                    <span key={i} className="agamotto-particle"
                      ref={el => particleRefs.current[i] = el}
                      style={{ '--p-size': `${3 + Math.random() * 8}px`, '--p-hue': Math.random() < 0.65 ? '145' : '120' }} />
                  ))}
                </div>

                {/* Gemstone Nav buttons — positioned exactly over the green gems in the image */}
                <button className="agamotto-gem-btn prev" onClick={handlePrev} aria-label="Previous event" data-tooltip="PREVIOUS" />
                <button className="agamotto-gem-btn next" onClick={handleNext} aria-label="Next event" data-tooltip="NEXT" />
              </div>
            </div>

            {/* Click Guide */}
            <div className={`agamotto-click-guide ${infoOpen ? "info-open" : ""}`}>
              <span className="guide-text">[ CLICK EYE IMAGE TO REVEAL SAGA DETAILS ]</span>
            </div>
          </div>

          {/* Info card backdrop blur/dimmer */}
          <div
            className={`agamotto-modal-backdrop ${infoOpen ? "visible" : ""}`}
            onClick={closeInfo}
          />

          {/* Info card — modal overlay */}
          <div
            className="agamotto-info-card"
            ref={infoCardRef}
            style={{ opacity: 0, pointerEvents: "none" }}
          >
            <button className="info-close-btn" onClick={closeInfo} aria-label="Close">✕</button>
            <div className="info-card-layout">
              <div className="info-text-col">
                <div className="info-badge">{activeEvent.badge}</div>
                <h3 className="info-title">{activeEvent.title}</h3>

                {activeEvent.details ? (
                  <>
                    {/* Navigation Tabs */}
                    <div className="modal-tabs">
                      <button 
                        className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                      >
                        OVERVIEW
                      </button>
                      <button 
                        className={`modal-tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rules')}
                      >
                        RULES & TOPICS
                      </button>
                      <button 
                        className={`modal-tab-btn ${activeTab === 'judging' ? 'active' : ''}`}
                        onClick={() => setActiveTab('judging')}
                      >
                        JUDGING
                      </button>
                    </div>

                    {/* Tab contents */}
                    {activeTab === 'overview' && (
                      <div className="tab-pane">
                        <p className="info-description">{activeEvent.description}</p>
                        
                        <div className="detail-section">
                          <h4>OBJECTIVE</h4>
                          <p className="info-description">{activeEvent.details.objective}</p>
                        </div>

                        <div className="info-meta">
                          <div className="meta-item">
                            <span className="meta-label">Date & Venue</span>
                            <strong className="meta-value" style={{ fontSize: '1.05rem', whiteSpace: 'nowrap' }}>
                              {activeEvent.details.date} • {activeEvent.details.venue}
                            </strong>
                          </div>
                          <div className="meta-divider"></div>
                          <div className="meta-item">
                            <span className="meta-label">Team Size</span>
                            <strong className="meta-value" style={{ fontSize: '1.05rem' }}>
                              {activeEvent.details.teamSize}
                            </strong>
                          </div>
                        </div>

                        <div className="detail-section">
                          <h4>EVENT FORMAT</h4>
                          <p style={{ fontStyle: 'italic', marginBottom: '0.8rem', color: '#8fa095', fontSize: '0.9rem' }}>
                            {activeEvent.details.format.intro}
                          </p>
                          {activeEvent.details.format.rounds.map((round, idx) => (
                            <div key={idx} className="round-box" style={{ marginBottom: '1rem', background: 'rgba(0, 255, 136, 0.03)', padding: '0.8rem 1.2rem', borderLeft: '3px solid #00ff88', borderRadius: '4px' }}>
                              <h5 style={{ color: '#00ff88', margin: '0 0 0.5rem 0', fontFamily: 'Cinzel, serif', letterSpacing: '1px', fontSize: '0.92rem' }}>
                                {round.name}
                              </h5>
                              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#b3c7b9', fontSize: '0.88rem', lineHeight: '1.5' }}>
                                {round.details.map((d, i) => (
                                  <li key={i} style={{ marginBottom: '0.3rem' }}>{d}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'rules' && (
                      <div className="tab-pane">
                        <div className="detail-section">
                          <h4>SUGGESTED DEBATE TOPICS</h4>
                          <ul className="topics-list" style={{ paddingLeft: '1.2rem', color: '#b3c7b9', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            {activeEvent.details.topics.map((topic, i) => (
                              <li key={i} style={{ marginBottom: '0.4rem', color: '#e6b800' }}>
                                <span style={{ color: '#b3c7b9' }}>"{topic}"</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="detail-section">
                          <h4>RULES & REGULATIONS</h4>
                          <ul className="rules-list" style={{ paddingLeft: '1.2rem', color: '#b3c7b9', fontSize: '0.88rem', lineHeight: '1.6' }}>
                            {activeEvent.details.rules.map((rule, i) => (
                              <li key={i} style={{ marginBottom: '0.4rem' }}>{rule}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === 'judging' && (
                      <div className="tab-pane">
                        <div className="detail-section">
                          <h4>JUDGING CRITERIA</h4>
                          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'left', background: 'rgba(0, 0, 0, 0.3)' }}>
                            <thead>
                              <tr style={{ borderBottom: '1.5px solid rgba(0, 255, 136, 0.3)' }}>
                                <th style={{ padding: '0.6rem', color: '#00ff88', fontFamily: 'Cinzel, serif' }}>CRITERION</th>
                                <th style={{ padding: '0.6rem', color: '#00ff88', fontFamily: 'Cinzel, serif', textAlign: 'right' }}>MARKS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {activeEvent.details.judging.criteria.map((c, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(0, 255, 136, 0.08)' }}>
                                  <td style={{ padding: '0.6rem', color: '#b3c7b9' }}>{c.name}</td>
                                  <td style={{ padding: '0.6rem', color: '#00ff88', fontWeight: 'bold', textAlign: 'right' }}>{c.marks}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="info-meta">
                          <div className="meta-item">
                            <span className="meta-label">Winner Prize</span>
                            <strong className="meta-value">{activeEvent.details.prizeDetails.winner}</strong>
                          </div>
                          <div className="meta-divider"></div>
                          <div className="meta-item">
                            <span className="meta-label">Runner-Up Prize</span>
                            <strong className="meta-value" style={{ color: '#e6b800', textShadow: '0 0 10px rgba(230, 184, 0, 0.4)' }}>
                              {activeEvent.details.prizeDetails.runnerUp}
                            </strong>
                          </div>
                        </div>

                        <div className="detail-section" style={{ marginTop: '1.2rem' }}>
                          <h4>WINNER SELECTION</h4>
                          <p style={{ color: '#b3c7b9', fontSize: '0.88rem', lineHeight: '1.6' }}>
                            {activeEvent.details.judging.selection}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="info-description">{activeEvent.description}</p>
                    <div className="info-meta">
                      <div className="meta-item">
                        <span className="meta-label">Reward</span>
                        <strong className="meta-value">{activeEvent.prize}</strong>
                      </div>
                      <div className="meta-divider"></div>
                      <div className="meta-item">
                        <span className="meta-label">Participants</span>
                        <strong className="meta-value">{activeEvent.participants}</strong>
                      </div>
                    </div>
                  </>
                )}

                <button className="saga-cta-btn" onClick={() => {
                  if (setActivePage) {
                    setActivePage("Registration");
                  }
                }}>
                  <span>ENTER SAGA</span>
                  <div className="btn-glow-effect"></div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section id="achievements" className="achievements-section" ref={statsContainerRef}>
          <div className="achievements-container">
            {[
              { target: 3000,   label: "Expected Heroes" },
              { target: 7,      label: "Upcoming Sagas" },
              { target: 35000, label: "Prizes to Win (₹)" },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-number" data-target={stat.target} ref={el => numbersRef.current[i] = el}>0</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Events;
