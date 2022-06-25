import {
  ApiGatewayV1Api,
  Auth,
  StackContext,
} from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  // Create User Pool
  const auth = new Auth(stack, "Auth");

  // Create Api
  new ApiGatewayV1Api(stack, "Api", {
    authorizers: {
      cognito: {
        type: 'user_pools',
        userPoolIds: [auth.userPoolId],
      },
    },
    defaults: {
      authorizer: "cognito",
    },
    routes: {
      "GET /": "functions/lambda.main",
    },
  });
}
