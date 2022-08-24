// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.7.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.2/utils/Counters.sol";

contract MyNFT is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint[] public quizIds = [4,5,6];
    struct User {
        mapping(uint=>bool) userQuizAttempted;
        mapping(uint=>uint) userQuizScoreMapping;
        mapping(uint=>bool) userQuizRewardMapping ;
    }
    mapping(address=>User) user;
    // mapping user to the quiz to the questions answered
    constructor() ERC721("QUIZ", "BDGE") {}
    
    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmUJwE7rACTQ58URthvmb9cFyAYMB29xt9gbUP39Yk6kZt?filename=badge.json";
    }
    // the owner should add all new quizez in contract
    function addQuiz(uint[] memory quizzes) onlyOwner public{
        quizIds = quizzes;
    }
    
    function quizExists(uint quizId) public view returns (bool){
        for(uint256 i=0; i<quizIds.length;i++){
            if(quizIds[i]==quizId){
                return true;
            }}
        return false;
    }
    
    function attemptQuiz(address _user , uint quizId)
        public view
        returns(bool)
        {
        require(quizExists(quizId), "Quiz Not Found");
        User storage u = user[_user];
        return (!u.userQuizAttempted[quizId]);
        
    }

    function viewQuizes() public view returns (uint256[] memory){
        return quizIds;
    }

    function quizScore(address _user, uint quizId, string[] memory answers ) public{
        require(quizExists(quizId),"Quiz not Found");
        User storage u = user[_user];
        u.userQuizAttempted[quizId]=true;
        uint256 score = 0;
        for(uint i =0;i<answers.length;i++){
            if(keccak256(bytes(answers[i])) == keccak256(bytes("true"))){
                score+=1;
            }
        }
        u.userQuizScoreMapping[quizId] = score;
        if(score>=(answers.length)*60/100){
            u.userQuizRewardMapping[quizId] = true;
            safeMint(_user);
        }
        else{u.userQuizRewardMapping[quizId] = false;
        }
        
    }
    function Score(address _user, uint quizId ) public view returns(bool, uint) {
        User storage u = user[_user];
        return(u.userQuizRewardMapping[quizId],u.userQuizScoreMapping[quizId]);
    }
    function safeMint(address to) internal {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    } 
}
