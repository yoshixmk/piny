# Piny

**HSK** (漢語水平考試) word memorization tool with CLI,  
and can learn vocabulary and pinyin efficiently.

![piny demo gif](./demo.gif)
## Usage
Preparation: Install [Deno](https://deno.land/manual/getting_started/installation), and download this repository.
```bash
$ deno run --allow-read ./mod.ts
```
### Index file
By creating a bookmark file, you can start from the middle.
```bash
# Ex: 8th of HSK3
$ echo 'HSK3-8' > dict/dict.idx
```

### Customize
Customization is possible by placing your dictionary file.  
Format is CSV:  
**[number, 汉语, pinyin, mean, index(start line key)]**
```csv
1,阿姨,āyí,叔母さん,HSK3-1
2,啊,a,はい，ええ,HSK3-2
3,矮,ǎi,短い,HSK3-3
...
```
> Dictionary origin files: <https://12daimedaimonya-chinese.com/hsk-word-download/>
