"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '../../ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const LoadingGame = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | null>(null);

    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const paddleYRef = useRef(150);
    const computerYRef = useRef(150);
    const ballRef = useRef({ pos: { x: 300, y: 200 }, dir: { x: -8, y: 3 } });

    const PADDLE_WIDTH = 10;
    const PADDLE_HEIGHT = 100;
    const BALL_RADIUS = 8;
    const BALL_SPEED = 8;

    const drawGame = useCallback((ctx: CanvasRenderingContext2D) => {
        // Clear canvas
        ctx.clearRect(0, 0, 600, 400);

        // Draw background - tema bağlı olarak değişir
        ctx.fillStyle = theme === 'dark' ? '#1E293B' : '#F3F4F6';
        ctx.fillRect(0, 0, 600, 400);

        // Draw paddles
        ctx.fillStyle = '#2563EB';
        ctx.fillRect(20, paddleYRef.current, PADDLE_WIDTH, PADDLE_HEIGHT);

        ctx.fillStyle = '#DC2626';
        ctx.fillRect(570, computerYRef.current, PADDLE_WIDTH, PADDLE_HEIGHT);

        // Draw ball
        ctx.fillStyle = theme === 'dark' ? '#E2E8F0' : '#1F2937';
        ctx.beginPath();
        ctx.arc(ballRef.current.pos.x, ballRef.current.pos.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // Draw score
        ctx.fillStyle = '#2563EB';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(playerScore.toString(), 150, 50);

        ctx.fillStyle = '#DC2626';
        ctx.fillText(computerScore.toString(), 450, 50);

        // Draw dividing line
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(300, 0);
        ctx.lineTo(300, 400);
        ctx.strokeStyle = theme === 'dark' ? '#64748B' : '#94A3B8';
        ctx.stroke();
    }, [playerScore, computerScore, theme]);

    const updateGame = useCallback(() => {
        // Calculate next position
        const nextX = ballRef.current.pos.x + ballRef.current.dir.x;
        const nextY = ballRef.current.pos.y + ballRef.current.dir.y;

        // Update ball position with collision checks
        let newX = nextX;
        let newY = nextY;
        let newDirX = ballRef.current.dir.x;
        let newDirY = ballRef.current.dir.y;

        // Wall collisions
        if (newY <= BALL_RADIUS || newY >= 400 - BALL_RADIUS) {
            newDirY *= -1;
            newY = newY <= BALL_RADIUS ? BALL_RADIUS : 400 - BALL_RADIUS;
        }

        // Paddle collisions
        const leftPaddleRight = 20 + PADDLE_WIDTH;
        const rightPaddleLeft = 570;

        // Left paddle collision
        if (newX - BALL_RADIUS <= leftPaddleRight &&
            ballRef.current.pos.x - BALL_RADIUS > leftPaddleRight &&
            newY >= paddleYRef.current &&
            newY <= paddleYRef.current + PADDLE_HEIGHT) {
            newX = leftPaddleRight + BALL_RADIUS;
            newDirX = BALL_SPEED;
            newDirY += (Math.random() - 0.5) * 3;
        }

        // Right paddle collision
        if (newX + BALL_RADIUS >= rightPaddleLeft &&
            ballRef.current.pos.x + BALL_RADIUS < rightPaddleLeft &&
            newY >= computerYRef.current &&
            newY <= computerYRef.current + PADDLE_HEIGHT) {
            newX = rightPaddleLeft - BALL_RADIUS;
            newDirX = -BALL_SPEED;
            newDirY += (Math.random() - 0.5) * 3;
        }

        // Score points and reset ball when it goes out
        if (newX < 0) {
            // Computer scores
            setComputerScore(prev => prev + 1);
            newX = 300;
            newY = 200;
            newDirX = BALL_SPEED;
            newDirY = 3;
        } else if (newX > 600) {
            // Player scores
            setPlayerScore(prev => prev + 1);
            newX = 300;
            newY = 200;
            newDirX = -BALL_SPEED;
            newDirY = 3;
        }

        // Update computer paddle with slightly slower speed for balance
        const targetY = ballRef.current.pos.y - PADDLE_HEIGHT / 2;
        const diff = targetY - computerYRef.current;
        computerYRef.current += Math.sign(diff) * Math.min(Math.abs(diff), 5);
        computerYRef.current = Math.max(0, Math.min(400 - PADDLE_HEIGHT, computerYRef.current));

        // Update ball
        ballRef.current = {
            pos: { x: newX, y: newY },
            dir: { x: newDirX, y: newDirY }
        };

        // Draw
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) drawGame(ctx);
    }, [drawGame]);

    const animate = useCallback((time: number) => {
        if (previousTimeRef.current !== undefined) {
            if (previousTimeRef.current !== null) {
                updateGame();
            }
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }, [updateGame]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [animate]);

    // Tema değiştiğinde canvas'ı yeniden çiz
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) drawGame(ctx);
    }, [theme, drawGame]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        paddleYRef.current = Math.min(Math.max(y - PADDLE_HEIGHT / 2, 0), 400 - PADDLE_HEIGHT);
    }, []);

    return (
        <Card className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md dark:bg-gray-800 dark:shadow-xl">
            <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {t('loading.game.title')}
                </h3>
                <div className="flex justify-center items-center gap-8 mt-2">
                    <div className="text-blue-600 dark:text-blue-400">
                        <span className="font-semibold">{t('loading.game.you')}</span> {playerScore}
                    </div>
                    <div className="text-red-600 dark:text-red-400">
                        <span className="font-semibold">{t('loading.game.opponent')}</span> {computerScore}
                    </div>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="mx-auto cursor-none shadow-sm dark:shadow-md"
                style={{ backgroundColor: theme === 'dark' ? '#1E293B' : '#F3F4F6' }}
                onMouseMove={handleMouseMove}
            />

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                {t('loading.game.instruction')}
            </p>
        </Card>
    );
};

export default LoadingGame;