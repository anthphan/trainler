/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      username
      email
      workoutSplits {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      username
      email
      workoutSplits {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      username
      email
      workoutSplits {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateWorkoutSplit = /* GraphQL */ `
  subscription OnCreateWorkoutSplit(
    $filter: ModelSubscriptionWorkoutSplitFilterInput
    $owner: String
  ) {
    onCreateWorkoutSplit(filter: $filter, owner: $owner) {
      id
      name
      description
      owner
      userID
      weeks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateWorkoutSplit = /* GraphQL */ `
  subscription OnUpdateWorkoutSplit(
    $filter: ModelSubscriptionWorkoutSplitFilterInput
    $owner: String
  ) {
    onUpdateWorkoutSplit(filter: $filter, owner: $owner) {
      id
      name
      description
      owner
      userID
      weeks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteWorkoutSplit = /* GraphQL */ `
  subscription OnDeleteWorkoutSplit(
    $filter: ModelSubscriptionWorkoutSplitFilterInput
    $owner: String
  ) {
    onDeleteWorkoutSplit(filter: $filter, owner: $owner) {
      id
      name
      description
      owner
      userID
      weeks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateWeek = /* GraphQL */ `
  subscription OnCreateWeek(
    $filter: ModelSubscriptionWeekFilterInput
    $owner: String
  ) {
    onCreateWeek(filter: $filter, owner: $owner) {
      id
      name
      workoutSplitID
      days {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateWeek = /* GraphQL */ `
  subscription OnUpdateWeek(
    $filter: ModelSubscriptionWeekFilterInput
    $owner: String
  ) {
    onUpdateWeek(filter: $filter, owner: $owner) {
      id
      name
      workoutSplitID
      days {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteWeek = /* GraphQL */ `
  subscription OnDeleteWeek(
    $filter: ModelSubscriptionWeekFilterInput
    $owner: String
  ) {
    onDeleteWeek(filter: $filter, owner: $owner) {
      id
      name
      workoutSplitID
      days {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateDay = /* GraphQL */ `
  subscription OnCreateDay(
    $filter: ModelSubscriptionDayFilterInput
    $owner: String
  ) {
    onCreateDay(filter: $filter, owner: $owner) {
      id
      dayName
      weekID
      exercises {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateDay = /* GraphQL */ `
  subscription OnUpdateDay(
    $filter: ModelSubscriptionDayFilterInput
    $owner: String
  ) {
    onUpdateDay(filter: $filter, owner: $owner) {
      id
      dayName
      weekID
      exercises {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteDay = /* GraphQL */ `
  subscription OnDeleteDay(
    $filter: ModelSubscriptionDayFilterInput
    $owner: String
  ) {
    onDeleteDay(filter: $filter, owner: $owner) {
      id
      dayName
      weekID
      exercises {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise(
    $filter: ModelSubscriptionExerciseFilterInput
    $owner: String
  ) {
    onCreateExercise(filter: $filter, owner: $owner) {
      id
      name
      reps
      sets
      dayID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise(
    $filter: ModelSubscriptionExerciseFilterInput
    $owner: String
  ) {
    onUpdateExercise(filter: $filter, owner: $owner) {
      id
      name
      reps
      sets
      dayID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise(
    $filter: ModelSubscriptionExerciseFilterInput
    $owner: String
  ) {
    onDeleteExercise(filter: $filter, owner: $owner) {
      id
      name
      reps
      sets
      dayID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
