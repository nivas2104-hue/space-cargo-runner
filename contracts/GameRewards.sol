// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GameRewards {
    mapping(address => uint256) public highScores;

    event ScoreSaved(
        address indexed player,
        uint256 score
    );

    function saveScore(uint256 score) public {
        if (score > highScores[msg.sender]) {
            highScores[msg.sender] = score;

            emit ScoreSaved(
                msg.sender,
                score
            );
        }
    }

    function getScore(
        address player
    )
        public
        view
        returns (uint256)
    {
        return highScores[player];
    }
}