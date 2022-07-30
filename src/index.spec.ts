import { apply } from "./index";

describe("apply", () => {
  it("should replace an attribute", function () {
    expect(apply({ a: "b" }, { a: "c" })).toMatchObject({ a: "c" });
  });

  it("should add an attribute", function () {
    expect(apply({ a: "b" }, { b: "c" })).toMatchObject({ a: "b", b: "c" });
  });

  it("should delete attribute", function () {
    expect(apply({ a: "b" }, { a: null })).toMatchObject({});
  });

  it("should delete attribute without affecting others", function () {
    expect(apply({ a: "b", b: "c" }, { a: null })).toMatchObject({ b: "c" });
  });

  it("should replace array with a string", function () {
    expect(apply({ a: ["b"] }, { a: "c" })).toMatchObject({ a: "c" });
  });

  it("should replace an string with an array", function () {
    expect(apply({ a: "c" }, { a: ["b"] })).toMatchObject({ a: ["b"] });
  });

  it("should apply recursively", function () {
    expect(apply({ a: { b: "c" } }, { a: { b: "d", c: null } })).toMatchObject({
      a: { b: "d" },
    });
  });

  it("should replace an object array with a number array", function () {
    expect(apply({ a: [{ b: "c" }] }, { a: [1] })).toMatchObject({ a: [1] });
  });

  it("should replace an array", function () {
    expect(apply(["a", "b"], ["c", "d"])).toMatchObject(["c", "d"]);
  });

  it("should replace an object with an array", function () {
    expect(apply({ a: "b" }, ["c"])).toMatchObject(["c"]);
  });

  it("should replace an object with null", function () {
    expect(apply({ a: "foo" }, null)).toEqual(null);
  });

  it("should replace with an object implementing toJSON() method", function () {
    expect(
      apply({ a: "foo" }, { a: new Date("2020-05-09T00:00:00.000Z") })
    ).toMatchObject({ a: new Date("2020-05-09T00:00:00.000Z").toJSON() });
  });

  it("should replace an object with a string", function () {
    expect(apply({ a: "foo" }, "bar")).toEqual("bar");
  });

  it("should not change null attributes", function () {
    expect(apply({ e: null }, { a: 1 })).toMatchObject({ e: null, a: 1 });
  });

  it("should not set an attribute to null", function () {
    expect(apply([1, 2], { a: "b", c: null })).toMatchObject({ a: "b" });
  });

  it("should not set an attribute to null in a sub object", function () {
    expect(apply({}, { a: { bb: { ccc: null } } })).toMatchObject({
      a: { bb: {} },
    });
  });

  describe("RFC Page 4: {title :  Goodbye! ,author  : {givenName  :  John ,familyName  :  Doe },tags :[  example ,  sample  ],content :  This will be unchanged }", () => {
    describe("patched with  {title: Hello!,phoneNumber:+01-123-456-7890,author:{familyName: null},tags: [example]}", () => {
      it("Results in: {title :  Hello! ,author  : {givenName  :  John },tags : [  example  ],content :  This will be unchanged ,phoneNumber :  +01-123-456-7890 }", () => {
        expect(
          apply(
            {
              title: "Goodbye!",
              author: {
                givenName: "John",
                familyName: "Doe",
              },
              tags: ["example", "sample"],
              content: "This will be unchanged",
            },
            {
              title: "Hello!",
              phoneNumber: "+01-123-456-7890",
              author: {
                familyName: null,
              },
              tags: ["example"],
            }
          )
        ).toMatchObject({
          title: "Hello!",
          author: {
            givenName: "John",
          },
          tags: ["example"],
          content: "This will be unchanged",
          phoneNumber: "+01-123-456-7890",
        });
      });
    });
  });
});
