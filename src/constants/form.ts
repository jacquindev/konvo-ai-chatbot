export const MIN_PASS_LENGTH = 8
export const MAX_PASS_LENGTH = 64

export const PASSWORD_FIELD_VALIDATION = {
  TEST: {
    SPECIAL_CHAR: (value: string) => /[-._!"`'#%&,:;<>=@{}~$()*+\/\\?\[\]^|]+/.test(value),
    LOWERCASE: (value: string) => /[a-z]/.test(value),
    UPPERCASE: (value: string) => /[A-Z]/.test(value),
    NUMBER: (value: string) => /.*[0-9].*/.test(value),
  },
  MSG: {
    MIN_LEN: `Password must be at least ${MIN_PASS_LENGTH} characters long`,
    MAX_LEN: `Password must be no longer than ${MAX_PASS_LENGTH} characters long`,
    SPECIAL_CHAR: "Password must contain at least 1 special character",
    LOWERCASE: "Password must contain at least 1 lowercase letter",
    UPPERCASE: "Password must contain at least 1 uppercase letter",
    NUMBER: "Password must contain at least 1 number",
  },
}
