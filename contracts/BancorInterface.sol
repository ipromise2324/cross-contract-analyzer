// SPDX-License-Identifier: UNLICENSED
// !! THIS FILE WAS AUTOGENERATED BY abi-to-sol v0.8.0. SEE SOURCE BELOW. !!
pragma solidity >=0.7.0 <0.9.0;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface BancorInterface {
    function restrictRegistryUpdate(bool _onlyOwnerCanUpdateRegistry) external;

    function registerEtherToken(address _token, bool _register) external;

    function getReturnByPath(address[] memory _path, uint256 _amount) external view returns (uint256, uint256);

    function claimAndConvertFor2(
        address[] memory _path,
        uint256 _amount,
        uint256 _minReturn,
        address _beneficiary,
        address _affiliateAccount,
        uint256 _affiliateFee
    ) external returns (uint256);

    function onlyOwnerCanUpdateRegistry() external view returns (bool);

    function updateRegistry() external;

    function convert2(
        address[] memory _path,
        uint256 _amount,
        uint256 _minReturn,
        address _affiliateAccount,
        uint256 _affiliateFee
    ) external payable returns (uint256);

    function maxAffiliateFee() external view returns (uint256);

    function withdrawTokens(address _token, address _to, uint256 _amount) external;

    function prevRegistry() external view returns (address);

    function acceptOwnership() external;

    function registry() external view returns (address);

    function rateByPath(address[] memory _path, uint256 _amount) external view returns (uint256);

    function etherTokens(address) external view returns (bool);

    function completeXConversion(
        address[] memory _path,
        address _bancorX,
        uint256 _conversionId,
        uint256 _minReturn,
        address _beneficiary
    ) external returns (uint256);

    function owner() external view returns (address);

    function convertFor2(
        address[] memory _path,
        uint256 _amount,
        uint256 _minReturn,
        address _beneficiary,
        address _affiliateAccount,
        uint256 _affiliateFee
    ) external payable returns (uint256);

    function claimAndConvertFor(
        address[] memory _path,
        uint256 _amount,
        uint256 _minReturn,
        address _beneficiary
    ) external returns (uint256);

    function restoreRegistry() external;

    function convertByPath(
        address[] memory _path,
        uint256 _amount,
        uint256 _minReturn,
        address _beneficiary,
        address _affiliateAccount,
        uint256 _affiliateFee
    ) external payable returns (uint256);

    function xConvert(
        address[] memory _path,
        uint256 _amount,
        uint256 _minReturn,
        bytes32 _targetBlockchain,
        bytes32 _targetAccount,
        uint256 _conversionId
    ) external payable returns (uint256);

    function claimAndConvert(address[] memory _path, uint256 _amount, uint256 _minReturn) external returns (uint256);

    function convertFor(
        address[] memory _path,
        uint256 _amount,
        uint256 _minReturn,
        address _beneficiary
    ) external payable returns (uint256);

    function xConvert2(
        address[] memory _path,
        uint256 _amount,
        uint256 _minReturn,
        bytes32 _targetBlockchain,
        bytes32 _targetAccount,
        uint256 _conversionId,
        address _affiliateAccount,
        uint256 _affiliateFee
    ) external payable returns (uint256);

    function safeTransfer(address _token, address _to, uint256 _value) external;

    function newOwner() external view returns (address);

    function conversionPath(address _sourceToken, address _targetToken) external view returns (address[] memory);

    function safeTransferFrom(address _token, address _from, address _to, uint256 _value) external;

    function claimAndConvert2(
        address[] memory _path,
        uint256 _amount,
        uint256 _minReturn,
        address _affiliateAccount,
        uint256 _affiliateFee
    ) external returns (uint256);

    function safeApprove(address _token, address _spender, uint256 _value) external;

    function transferOwnership(address _newOwner) external;

    function convert(address[] memory _path, uint256 _amount, uint256 _minReturn) external payable returns (uint256);

    function setMaxAffiliateFee(uint256 _maxAffiliateFee) external;

    event Conversion(
        address indexed _smartToken,
        address indexed _fromToken,
        address indexed _toToken,
        uint256 _fromAmount,
        uint256 _toAmount,
        address _trader
    );
    event OwnerUpdate(address indexed _prevOwner, address indexed _newOwner);
}

// THIS FILE WAS AUTOGENERATED FROM THE FOLLOWING ABI JSON:
/*
[{"inputs":[{"name":"_onlyOwnerCanUpdateRegistry","type":"bool"}],"name":"restrictRegistryUpdate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_register","type":"bool"}],"name":"registerEtherToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"}],"name":"getReturnByPath","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_beneficiary","type":"address"},{"name":"_affiliateAccount","type":"address"},{"name":"_affiliateFee","type":"uint256"}],"name":"claimAndConvertFor2","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"onlyOwnerCanUpdateRegistry","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateRegistry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_affiliateAccount","type":"address"},{"name":"_affiliateFee","type":"uint256"}],"name":"convert2","outputs":[{"name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"maxAffiliateFee","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"prevRegistry","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"}],"name":"rateByPath","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"","type":"address"}],"name":"etherTokens","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_bancorX","type":"address"},{"name":"_conversionId","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_beneficiary","type":"address"}],"name":"completeXConversion","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_beneficiary","type":"address"},{"name":"_affiliateAccount","type":"address"},{"name":"_affiliateFee","type":"uint256"}],"name":"convertFor2","outputs":[{"name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_beneficiary","type":"address"}],"name":"claimAndConvertFor","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"restoreRegistry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_beneficiary","type":"address"},{"name":"_affiliateAccount","type":"address"},{"name":"_affiliateFee","type":"uint256"}],"name":"convertByPath","outputs":[{"name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_targetBlockchain","type":"bytes32"},{"name":"_targetAccount","type":"bytes32"},{"name":"_conversionId","type":"uint256"}],"name":"xConvert","outputs":[{"name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"claimAndConvert","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_beneficiary","type":"address"}],"name":"convertFor","outputs":[{"name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_targetBlockchain","type":"bytes32"},{"name":"_targetAccount","type":"bytes32"},{"name":"_conversionId","type":"uint256"},{"name":"_affiliateAccount","type":"address"},{"name":"_affiliateFee","type":"uint256"}],"name":"xConvert2","outputs":[{"name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"safeTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_sourceToken","type":"address"},{"name":"_targetToken","type":"address"}],"name":"conversionPath","outputs":[{"name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_affiliateAccount","type":"address"},{"name":"_affiliateFee","type":"uint256"}],"name":"claimAndConvert2","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"safeApprove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"convert","outputs":[{"name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_maxAffiliateFee","type":"uint256"}],"name":"setMaxAffiliateFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_registry","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_smartToken","type":"address"},{"indexed":true,"name":"_fromToken","type":"address"},{"indexed":true,"name":"_toToken","type":"address"},{"indexed":false,"name":"_fromAmount","type":"uint256"},{"indexed":false,"name":"_toAmount","type":"uint256"},{"indexed":false,"name":"_trader","type":"address"}],"name":"Conversion","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}]
*/