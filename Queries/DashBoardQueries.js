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
  ) {
    totalPosts: postsConnection {
      aggregate {
        count
      }
    }
    postWeek1: postsConnection(where: { createdAt_gte: $stamp1 }) {
      aggregate {
        count
      }
    }
    postWeek2: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp1 }, { createdAt_gte: $stamp2 }] }
    ) {
      aggregate {
        count
      }
    }
    postWeek3: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp2 }, { createdAt_gte: $stamp3 }] }
    ) {
      aggregate {
        count
      }
    }
    postWeek4: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp3 }, { createdAt_gte: $stamp4 }] }
    ) {
      aggregate {
        count
      }
    }
    postWeek5: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp4 }, { createdAt_gte: $stamp5 }] }
    ) {
      aggregate {
        count
      }
    }
    postWeek6: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp5 }, { createdAt_gte: $stamp6 }] }
    ) {
      aggregate {
        count
      }
    }
    postMonth1: postsConnection(where: { createdAt_gte: $stamp7 }) {
      aggregate {
        count
      }
    }
    postMonth2: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp7 }, { createdAt_gte: $stamp8 }] }
    ) {
      aggregate {
        count
      }
    }
    postMonth3: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp8 }, { createdAt_gte: $stamp9 }] }
    ) {
      aggregate {
        count
      }
    }
    postMonth4: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp9 }, { createdAt_gte: $stamp10 }] }
    ) {
      aggregate {
        count
      }
    }
    postMonth5: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp10 }, { createdAt_gte: $stamp11 }] }
    ) {
      aggregate {
        count
      }
    }
    postMonth6: postsConnection(
      where: { AND: [{ createdAt_lt: $stamp11 }, { createdAt_gte: $stamp12 }] }
    ) {
      aggregate {
        count
      }
    }
    totalUsers: usersConnection {
      aggregate {
        count
      }
    }
    userWeek1: usersConnection(where: { createdAt_gte: $stamp1 }) {
      aggregate {
        count
      }
    }
    userWeek2: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp1 }, { createdAt_gte: $stamp2 }] }
    ) {
      aggregate {
        count
      }
    }
    userWeek3: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp2 }, { createdAt_gte: $stamp3 }] }
    ) {
      aggregate {
        count
      }
    }
    userWeek4: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp3 }, { createdAt_gte: $stamp4 }] }
    ) {
      aggregate {
        count
      }
    }
    userWeek5: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp4 }, { createdAt_gte: $stamp5 }] }
    ) {
      aggregate {
        count
      }
    }
    userWeek6: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp5 }, { createdAt_gte: $stamp6 }] }
    ) {
      aggregate {
        count
      }
    }
    userMonth1: usersConnection(where: { createdAt_gte: $stamp7 }) {
      aggregate {
        count
      }
    }
    userMonth2: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp7 }, { createdAt_gte: $stamp8 }] }
    ) {
      aggregate {
        count
      }
    }
    userMonth3: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp8 }, { createdAt_gte: $stamp9 }] }
    ) {
      aggregate {
        count
      }
    }
    userMonth4: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp9 }, { createdAt_gte: $stamp10 }] }
    ) {
      aggregate {
        count
      }
    }
    userMonth5: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp10 }, { createdAt_gte: $stamp11 }] }
    ) {
      aggregate {
        count
      }
    }
    userMonth6: usersConnection(
      where: { AND: [{ createdAt_lt: $stamp11 }, { createdAt_gte: $stamp12 }] }
    ) {
      aggregate {
        count
      }
    }
    paidUsers: usersConnection(where: { status: PAID }) {
      aggregate {
        count
      }
    }
    freeUsers: usersConnection(where: { status: FREE }) {
      aggregate {
        count
      }
    }
    employeeUsers: usersConnection(where: { status: EMPLOYEE }) {
      aggregate {
        count
      }
    }
  }
`;
