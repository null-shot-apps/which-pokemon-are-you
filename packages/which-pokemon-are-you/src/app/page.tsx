'use client';

import { useState } from 'react';

type Pokemon = {
  name: string;
  description: string;
  image: string;
  traits: string[];
};

const questions = [
  {
    id: 1,
    question: "How do you handle a \"hater\" on Twitter/X?",
    options: [
      { text: "Kill them with kindness and lots of emojis.", points: { pikachu: 3, charizard: 0, squirtle: 1, snorlax: 0 } },
      { text: "Hit them with a logic-bomb so heavy they delete their account.", points: { pikachu: 0, charizard: 3, squirtle: 2, snorlax: 0 } },
      { text: "Ignore them. I'm too busy building the future.", points: { pikachu: 0, charizard: 1, squirtle: 3, snorlax: 1 } },
      { text: "Use their salt to fuel my next 48-hour sprint.", points: { pikachu: 1, charizard: 2, squirtle: 0, snorlax: 3 } }
    ]
  },
  {
    id: 2,
    question: "A heated argument breaks out in the main chat. How do you handle it?",
    options: [
      { text: "I post a perfectly timed meme to defuse the tension.", points: { pikachu: 3, charizard: 0, squirtle: 1, snorlax: 1 } },
      { text: "I drop a \"Wall of Text\" explaining exactly why both sides are wrong.", points: { pikachu: 0, charizard: 3, squirtle: 2, snorlax: 0 } },
      { text: "I leave the room. If it isn't about the build, I'm not interested.", points: { pikachu: 0, charizard: 1, squirtle: 3, snorlax: 1 } },
      { text: "I start a third, even more chaotic argument just to see what happens.", points: { pikachu: 1, charizard: 2, squirtle: 0, snorlax: 3 } }
    ]
  },
  {
    id: 3,
    question: "What's your ultimate \"special move\" in life?",
    options: [
      { text: "Extreme Speed: I finish a week's work in two hours.", points: { pikachu: 3, charizard: 2, squirtle: 1, snorlax: 0 } },
      { text: "Teleport: I'm always exactly where I need to be.", points: { pikachu: 1, charizard: 1, squirtle: 3, snorlax: 0 } },
      { text: "Rest: I can sleep anywhere, anytime, for any duration.", points: { pikachu: 0, charizard: 0, squirtle: 1, snorlax: 3 } },
      { text: "Hyper Beam: I give 1000% effort, then I need a long nap.", points: { pikachu: 1, charizard: 3, squirtle: 0, snorlax: 2 } }
    ]
  }
];

const pokemons: Record<string, Pokemon> = {
  pikachu: {
    name: "Pikachu",
    description: "You're energetic, friendly, and always ready for adventure! Your positive attitude is contagious.",
    image: "⚡",
    traits: ["Energetic", "Friendly", "Loyal", "Playful"]
  },
  charizard: {
    name: "Charizard",
    description: "You're strong, confident, and competitive! You love challenges and never back down.",
    image: "🔥",
    traits: ["Powerful", "Confident", "Brave", "Competitive"]
  },
  squirtle: {
    name: "Squirtle",
    description: "You're dependable, strategic, and caring! Friends know they can always count on you.",
    image: "💧",
    traits: ["Loyal", "Strategic", "Caring", "Dependable"]
  },
  snorlax: {
    name: "Snorlax",
    description: "You're calm, easygoing, and love your comfort! You know how to enjoy life's simple pleasures.",
    image: "😴",
    traits: ["Calm", "Relaxed", "Content", "Peaceful"]
  }
};

export default function PokemonQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ snorlax: 0, pikachu: 0, charizard: 0, squirtle: 0 });
  const [result, setResult] = useState<Pokemon | null>(null);
  const [started, setStarted] = useState(false);

  const handleAnswer = (points: Record<string, number>) => {
    const newScores = {
      snorlax: scores.snorlax + points.snorlax,
      pikachu: scores.pikachu + points.pikachu,
      charizard: scores.charizard + points.charizard,
      squirtle: scores.squirtle + points.squirtle
    };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const winner = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      setResult(pokemons[winner]);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScores({ snorlax: 0, pikachu: 0, charizard: 0, squirtle: 0 });
    setResult(null);
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
          <div className="text-8xl mb-6">🎮</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Which Pokémon Are You?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Answer 3 questions to discover your Pokémon personality!
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl px-12 py-4 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
          <div className="text-9xl mb-6">{result.image}</div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            You are {result.name}!
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            {result.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {result.traits.map((trait) => (
              <span
                key={trait}
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-full font-semibold"
              >
                {trait}
              </span>
            ))}
          </div>
          <button
            onClick={restart}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl px-12 py-4 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.points)}
              className="w-full bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-gray-800 font-semibold text-lg px-6 py-4 rounded-xl transition-all hover:scale-102 shadow-md hover:shadow-lg"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}



