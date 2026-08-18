const { test, expect } = require('@playwright/test');

var userId;

test('Get - Get user details', async({ request }) => {
 const response = await request.get("https://reqres.in/api/users?page=2");
 console.log("Get response: " + await response.json());

 expect(response.status()).toBe(200);

});

test('Post - Create user', async({ request }) => {
  const response = await request.post("https://reqres.in/api/users",
    {
      data: {"name":"Anirban", "job":"Tester"},
      headers: {"Accept":"application/json"}
    });

    console.log("Post response: " + await response.json());
    expect(response.status()).toBe(201);

    var responseReceived = await response.json();
    userId = responseReceived.id;

});

test('Update - Update user details', async({ request }) => {
    const response = await request.put("https://reqres.in/api/users"+userId,
    {
      data: {"name":"Anirban", "job":"Automation Tester"},
      headers: {"Accept":"application/json"}
    });

    console.log("Post response: " + await response.json());
    await expect(response.status()).toBe(200);

});

test('Delete - Delete user details', async({ request }) => {
  const response = await request.delete("https://reqres.in/api/users"+userId);
  await expect(response.status()).toBe(204);

});