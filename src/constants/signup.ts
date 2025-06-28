export const SIGNUP_FORM_FIELDS = [
    {
        name: "username",
        label: "ユーザー名",
        type: "text",
        placeholder: "ユーザー名を入力してください",
    },
    {
        name: "email",
        label: "メールアドレス",
        type: "email",
        placeholder: "メールアドレスを入力してください",
    },
    {
        name: "password",
        label: "パスワード",
        type: "password",
        placeholder: "パスワードを入力してください",
    }
] as const;

