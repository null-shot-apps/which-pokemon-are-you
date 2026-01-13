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
    question: "How do you spend your free time?",
    options: [
      { text: "Relaxing and napping", points: { snorlax: 3, pikachu: 0, charizard: 0, squirtle: 1 } },
      { text: "Playing and having fun", points: { snorlax: 0, pikachu: 3, charizard: 1, squirtle: 2 } },
      { text: "Training and competing", points: { snorlax: 0, pikachu: 1, charizard: 3, squirtle: 1 } },
      { text: "Helping others", points: { snorlax: 1, pikachu: 2, charizard: 0, squirtle: 3 } }
    ]
  },
  {
    id: 2,
    question: "What's your approach to challenges?",
    options: [
      { text: "Take it slow and steady", points: { snorlax: 3, pikachu: 0, charizard: 0, squirtle: 2 } },
      { text: "Jump in with enthusiasm", points: { snorlax: 0, pikachu: 3, charizard: 2, squirtle: 1 } },
      { text: "Face them head-on with power", points: { snorlax: 0, pikachu: 1, charizard: 3, squirtle: 0 } },
      { text: "Think strategically first", points: { snorlax: 1, pikachu: 0, charizard: 1, squirtle: 3 } }
    ]
  },
  {
    id: 3,
    question: "How would friends describe you?",
    options: [
      { text: "Calm and easygoing", points: { snorlax: 3, pikachu: 1, charizard: 0, squirtle: 1 } },
      { text: "Energetic and friendly", points: { snorlax: 0, pikachu: 3, charizard: 1, squirtle: 2 } },
      { text: "Strong and confident", points: { snorlax: 0, pikachu: 0, charizard: 3, squirtle: 1 } },
      { text: "Loyal and dependable", points: { snorlax: 1, pikachu: 2, charizard: 1, squirtle: 3 } }
    ]
  },
  {
    id: 4,
    question: "What's your ideal environment?",
    options: [
      { text: "Cozy and comfortable", points: { snorlax: 3, pikachu: 1, charizard: 0, squirtle: 0 } },
      { text: "Lively and social", points: { snorlax: 0, pikachu: 3, charizard: 1, squirtle: 2 } },
      { text: "Exciting and adventurous", points: { snorlax: 0, pikachu: 1, charizard: 3, squirtle: 1 } },
      { text: "Peaceful near water", points: { snorlax: 1, pikachu: 0, charizard: 0, squirtle: 3 } }
    ]
  },
  {
    id: 5,
    question: "What motivates you most?",
    options: [
      { text: "Comfort and relaxation", points: { snorlax: 3, pikachu: 0, charizard: 0, squirtle: 1 } },
      { text: "Making friends happy", points: { snorlax: 0, pikachu: 3, charizard: 0, squirtle: 2 } },
      { text: "Being the best", points: { snorlax: 0, pikachu: 1, charizard: 3, squirtle: 1 } },
      { text: "Protecting loved ones", points: { snorlax: 1, pikachu: 2, charizard: 1, squirtle: 3 } }
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
            Answer 5 questions to discover your Pokémon personality!
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

