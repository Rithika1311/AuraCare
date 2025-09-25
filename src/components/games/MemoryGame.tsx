import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, RotateCcw, Star, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MemoryGame = () => {
  const [cards, setCards] = useState<Array<{id: number, value: string, flipped: boolean, matched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const { toast } = useToast();

  const symbols = ['🌸', '🦋', '🌺', '🌻', '🌷', '🌹', '🍀', '🌟', '💫', '⭐', '🌙', '☀️'];
  
  const difficultySettings = {
    easy: { pairs: 6, points: 10 },
    medium: { pairs: 8, points: 15 },
    hard: { pairs: 10, points: 20 }
  };

  const initializeGame = () => {
    const pairs = difficultySettings[difficulty].pairs;
    const gameSymbols = symbols.slice(0, pairs);
    const gameCards = [...gameSymbols, ...gameSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        value: symbol,
        flipped: false,
        matched: false
      }));
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setGameComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, matched: true }
              : card
          ));
          setFlippedCards([]);
          setScore(prev => prev + difficultySettings[difficulty].points);
          setMoves(prev => prev + 1);

          // Check if game is complete
          const updatedCards = cards.map(card => 
            card.id === first || card.id === second 
              ? { ...card, matched: true }
              : card
          );
          
          if (updatedCards.every(card => card.matched)) {
            setGameComplete(true);
            toast({
              title: "Congratulations! 🎉",
              description: `Game completed in ${moves + 1} moves! Score: ${score + difficultySettings[difficulty].points}`,
            });
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, flipped: false }
              : card
          ));
          setFlippedCards([]);
          setMoves(prev => prev + 1);
        }, 1000);
      }
    }
  }, [flippedCards, cards, moves, score, difficulty]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (card?.flipped || card?.matched) return;

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, flipped: true } : card
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>Memory Challenge</span>
        </CardTitle>
        <CardDescription>
          Match the pairs to improve your cognitive function
        </CardDescription>
        
        {/* Game Stats */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-muted-foreground">Moves:</span>
              <Badge variant="secondary">{moves}</Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <Badge variant="secondary">{score}</Badge>
            </div>
          </div>
          
          {/* Difficulty Selector */}
          <div className="flex space-x-2">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <Button
                key={level}
                size="sm"
                variant={difficulty === level ? "default" : "outline"}
                onClick={() => setDifficulty(level)}
                className="capitalize"
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Game Complete */}
        {gameComplete && (
          <div className="text-center p-6 bg-success/10 rounded-lg border border-success/20">
            <Trophy className="h-12 w-12 text-success mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-success">Excellent Work!</h3>
            <p className="text-sm text-muted-foreground">
              Completed in {moves} moves with {score} points!
            </p>
          </div>
        )}
        
        {/* Game Grid */}
        <div 
          className={`grid gap-3 ${
            difficultySettings[difficulty].pairs <= 6 ? 'grid-cols-4' : 
            difficultySettings[difficulty].pairs <= 8 ? 'grid-cols-4' : 'grid-cols-5'
          }`}
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.flipped || card.matched || flippedCards.length === 2}
              className={`
                aspect-square rounded-lg border-2 text-2xl font-bold transition-all duration-300
                ${card.flipped || card.matched 
                  ? 'bg-primary/10 border-primary text-primary scale-105' 
                  : 'bg-muted border-border hover:border-primary/50 hover:scale-105'
                }
                ${card.matched ? 'opacity-70' : ''}
                disabled:cursor-not-allowed
              `}
            >
              {(card.flipped || card.matched) ? card.value : '?'}
            </button>
          ))}
        </div>
        
        {/* Reset Button */}
        <Button 
          onClick={initializeGame} 
          variant="outline" 
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          New Game
        </Button>
      </CardContent>
    </Card>
  );
};

export default MemoryGame;