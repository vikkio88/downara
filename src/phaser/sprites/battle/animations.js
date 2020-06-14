import { randomizer } from 'lib';
import { ACTIONS } from "lib/battle/Battle";

export const animationFinishedLabel = index => `turn_${index}_finished`;

export const ACTION_ANIMATIONS = {
    [ACTIONS.MOVE]: (grid, target, result, index) => {
        const move = ACTIONS.MOVE;
        if (!result) return ACTION_ANIMATIONS.failedWiggle(grid, target, result, index, move);
        const { i, j } = result.position || target.getPosition();
        const tile = grid.getTile({ i, j });
        const { x, y } = tile.getCenter();
        const config = {
            targets: target,
            x, y,
            duration: 1000,
            ease: 'circular.easeInOut',
            loop: false,
            onComplete: () => grid.scene.events.emit(animationFinishedLabel(index))
        };
        return () => {
            target.reportResult(move, Boolean(result));
            grid.scene.tweens.add(config);
        };
    },
    [ACTIONS.ATTACK]: (grid, target, result, index, movePayload) => {
        const { position } = movePayload;
        const move = ACTIONS.ATTACK;
        if (!result) return ACTION_ANIMATIONS.failedTile(grid, target, { position }, index, ACTIONS.ATTACK);
        const tile = grid.getTile(position);
        const callback = () => {
            grid.scene.time.addEvent({
                delay: 1500,
                callback: () => {
                    grid.scene.events.emit(animationFinishedLabel(index));
                    tile.resetIndicator();
                },
                loop: false,
            });
        };
        return () => {
            target.reportResult(move, Boolean(result));
            tile.showAttackSuccess(result, callback);
        };
    },
    [ACTIONS.PARRY]: (grid, target, result, index) => {
        // parry can fail if player died
        const callback = () => grid.scene.events.emit(animationFinishedLabel(index));
        if (!result) return () => callback();
        return () => {
            target.reportResult(ACTIONS.PARRY, Boolean(result));
            target.showParry(callback);
        };
    },
    [ACTIONS.DIE]: (grid, target, result, index) => {
        return () => {
            target.reportResult(ACTIONS.DIE);
            grid.scene.tweens.add({
                targets: target,
                alpha: { from: 1, to: 0.5 },
                duration: 1000,
                ease: 'sine.out',
                loop: false,
                onComplete: () => grid.scene.events.emit(animationFinishedLabel(index))
            });
        };
    },
    failedWiggle: (grid, target, result, index, move) => {
        const x = randomizer.bool() ? 1 : -1 * randomizer.int(30, 50);
        const y = randomizer.bool() ? 1 : -1 * randomizer.int(30, 50);
        const to = randomizer.bool() ? 1 : -1 * randomizer.int(20, 180);
        return () => {
            target.reportResult(move);
            grid.scene.tweens.add({
                targets: target,
                x: target.x - x,
                y: target.y + y,
                angle: { from: 0, to },
                duration: 1000,
                ease: 'sine.out',
                loop: false,
                yoyo: true,
                onComplete: () => grid.scene.events.emit(animationFinishedLabel(index))
            });
        };
    },
    failedTile: (grid, target, result, index, move) => {
        const { i, j } = result.position;
        const tile = grid.getTile({ i, j });
        const callback = () => {
            grid.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    grid.scene.events.emit(animationFinishedLabel(index));
                    tile.resetIndicator();
                },
                loop: false,
            });
        };
        return () => {
            target.reportResult(move);
            tile.showFailedMove(callback);
        };
    }
};