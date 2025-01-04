/*
Given a string s, find the length of the longest
substring
without repeating characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:

    0 <= s.length <= 5 * 104
    s consists of English letters, digits, symbols and spaces.
*/
function lengthOfLongestSubstring(s: string): number {
  let maxLength = 0;
  const charIndexMap = new Map<string, number>();
  let start = 0;
  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    if (charIndexMap.has(char) && charIndexMap.get(char)! >= start) {
      start = charIndexMap.get(char)! + 1;
    }
    charIndexMap.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
}

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('bbbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));
