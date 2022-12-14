# ts-merge-patch
Typescript ready attempt of RFC 7396 JSON Merge Patch method

**Based upon RFC7396:**
[RFC 7396](http://tools.ietf.org/html/rfc7396)
*This specification defines the JSON merge patch document format, processing rules, and associated MIME media type identifier.  The  merge patch format is primarily intended for use with the HTTP PATCH method [RFC5789] as a means of describing a set of modifications to a target resource's content.*

## Install

Install the module via NPM

### npm

```sh
$ npm install ts-merge-patch --save
```

To use simply import apply from the module
`import {apply} from 'ts-merge-patch';`

### Applying a patch to a target origin:
```ts
apply<obj1Type,obj2Type>(target: obj1Type, patchItem: obj2Type) : Object | obj2Type | {}
```

### Example

```ts
const patch = {
        title: "Hello!",
        phoneNumber: "+01-123-456-7890",
        author: {
            familyName: null,
        },
        tags: ["example"],
    };

const target = {
        title: "Goodbye!",
        author: {
            givenName: "John",
            familyName: "Doe",
        },
        tags: ["example", "sample"],
        content: "This will be unchanged",
    };

const updated = apply(target,patch);

console.log(updated);
```
```sh
{
    title: "Hello!",
    author: {
    givenName: "John",
    },
    tags: ["example"],
    content: "This will be unchanged",
    phoneNumber: "+01-123-456-7890",
}
```

```ts
import { apply } from "ts-merge-patch";

const target = { a: 56, b: 65, c: { e: 4, hi: 7 } };
const patch = { c: { e: 444 }, newProp: "test" };
console.log(apply(target, patch));
//{ a: 56, b: 65, c: { e: 444, hi: 7 }, newProp: 'test' }

interface ob1 {
  thisItem: string;
  thatItem: string;
  anotherItem: string;
}
interface ob2 {
  bonusItem: string;
  thisItem: string;
  thatItem: string;
}

interface combined extends ob1, ob2 {}

const target2: ob1 = { anotherItem: "bah", thisItem: "this", thatItem: "that" };
const patch2: ob2 = { thisItem: "this", thatItem: "nope", bonusItem: "bonus" };

const r = apply<ob1, ob2>(target2, patch2) as combined;
/*
{
  anotherItem: 'bah',
  thisItem: 'this',
  thatItem: 'nope',
  bonusItem: 'bonus'
}
*/
```
## Running tests

Jest tests are available, many thanks goes to [pierreinglebert](https://github.com/pierreinglebert/json-merge-patch) as his tests provided the basis for which this test code was written. Just rejigged them to work in Jest.

```sh
npm test
```
# License

  MIT