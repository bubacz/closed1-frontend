import gql from "graphql-tag";

export const GET_POSTS_DATA = gql`
  query GET_POSTS_DATA(
    $stamp1: DateTime
    $stamp2: DateTime
    $stamp3: DateTime
    $stamp4: DateTime
    $stamp5: DateTime
    $stamp6: DateTime
    $stamp7: DateTime
    $stamp8: DateTime
    $stamp9: DateTime
    $stamp10: DateTime
    $stamp11: DateTime
    $stamp12: DateTime
  ) 
  {
    total: usersConnection {
      aggregate {
        count
      }
    }
    week1: usersConnection(where: { createdAt_gte: $stamp1 }) {
      aggregate {
        count
      }
    }
    week2: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp1 }, { createdAt_gte: $stamp2 }] }
    ) {
      aggregate {
        count
      }
    }
    week3: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp2 }, { createdAt_gte: $stamp3 }] }
    ) {
      aggregate {
        count
      }
    }
    week4: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp3 }, { createdAt_gte: $stamp4 }] }
    ) {
      aggregate {
        count
      }
    }
    week5: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp4 }, { createdAt_gte: $stamp5}] }
    ) {
      aggregate {
        count
      }
    }
    week6: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp5 }, { createdAt_gte: $stamp6 }] }
    ) {
      aggregate {
        count
      }
    }
    month1: usersConnection(where: { createdAt_gte: $stamp7 }) {
      aggregate {
        count
      }
    }
    month2: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp7 }, { createdAt_gte: $stamp8 }] }
    ) {
      aggregate {
        count
      }
    }
    month3: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp8 }, { createdAt_gte: $stamp9 }] }
    ) {
      aggregate {
        count
      }
    }
    month4: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp9 }, { createdAt_gte: $stamp10 }] }
    ) {
      aggregate {
        count
      }
    }
    month5: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp10 }, { createdAt_gte: $stamp11 }] }
    ) {
      aggregate {
        count
      }
    }
    month6: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp11 }, { createdAt_gte: $stamp12 }] }
    ) {
      aggregate {
        count
      }
    }
  }
`;
