exports.seed = (knex) => {
  return knex("subscribers").insert([
    {
      id: 1,
      name: "Kim",
      email: "kim@gmail.com",
    },
    {
      id: 2,
      name: "park",
      email: "park@gmail.com",
    },
  ]);
};
