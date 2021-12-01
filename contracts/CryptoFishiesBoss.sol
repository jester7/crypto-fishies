// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./CryptoFishiesCharacter.sol";

contract CryptoFishiesBoss is CryptoFishiesCharacter {
    
    event AttackComplete(uint newBossHp, uint newPlayerHp);
    event CharacterDied();
    
    struct BigBoss {
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
        Action[] actions;
    }

    BigBoss public bigBoss;

    function attackBoss() public {
        // Get the state of the player's NFT.
        uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];

        CharacterAttributes storage player = nftHolderAttributes[
            nftTokenIdOfPlayer
        ];
        console.log(
            "\nPlayer w/ character %s about to attack. Has %s HP and %s AD",
            player.name,
            player.hp,
            player.attackDamage
        );
        console.log(
            "Boss %s has %s HP and %s AD",
            bigBoss.name,
            bigBoss.hp,
            bigBoss.attackDamage
        );

        require(player.hp > 0, "Error: character must have HP to attack boss.");
        require(bigBoss.hp > 0, "Error: boss has already been defeated!");

        // Allow player to attack boss.
        if (bigBoss.hp < player.attackDamage) {
            bigBoss.hp = 0;
        } else {
            bigBoss.hp = bigBoss.hp - player.attackDamage;
        }

        // Allow boss to attack player.
        if (player.hp < bigBoss.attackDamage) {
            player.hp = 0;
        } else {
            player.hp = player.hp - bigBoss.attackDamage;
        }

        // Console for ease.
        console.log("Player attacked boss. New boss hp: %s", bigBoss.hp);
        console.log("Boss attacked player. New player hp: %s\n", player.hp);

        emit AttackComplete(bigBoss.hp, player.hp);
    }

    function getBigBoss() public view returns (BigBoss memory) {
        return bigBoss;
    }
}
