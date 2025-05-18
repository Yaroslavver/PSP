export function getSumAndMultOfArray(arr){
    if(arr){
        let arr_sum = 0;
        let arr_mult = 1;
        for (let elem in arr){
            arr_sum += Number(arr[elem]);
            arr_mult *= Number(arr[elem]);
        }
        return [arr_sum, arr_mult];
    }
    else{return 0;}
}

export function equalArr(arr1, arr2){
    if(arr1 && arr2 && arr1.length === arr2.length){
        let elems = {};        
        for (let num of arr1) {
            if(elems[num]){
                elems[num] = elems[num] + 1;
            }
            else{
                elems[num] = 1;
            }
        }        
        for (let num of arr2) {
            if (!elems[num]) {
                return false;
            }
            elems[num]--;
        }        
        return true;
    }
    else{return false;}
}

export function anagram(words) {
    const anagrams = {};
    for (let word of words) {
        const key = word.toLowerCase().split('').sort().join('');
        if (!anagrams[key]) {anagrams[key] = [];}
        anagrams[key].push(word);
    }
    const filt = Object.values(anagrams).filter(group => group.length >= 2);
    for (let group of filt) {
        group.sort();
    }
    filt.sort((a, b) => {
        const wordA = a[0].toLowerCase();
        const wordB = b[0].toLowerCase();
        return wordA.localeCompare(wordB);
    });

    
    let resultHTML = '';
    for (const group of filt) {
        resultHTML += `${group.join(', ')}<br>`;
    }
    console.log(anagrams);
    return resultHTML;
}