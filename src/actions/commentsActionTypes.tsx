export enum CommentsTypes {
  INITIALIZE_COMMENT_SECTION = "INITIALIZE_COMMENT_SECTION",
}

export type INITIALIZE_COMMENT_SECTION = { type: CommentsTypes.INITIALIZE_COMMENT_SECTION; payload: number };

export type CommentsActionTypes = INITIALIZE_COMMENT_SECTION;
