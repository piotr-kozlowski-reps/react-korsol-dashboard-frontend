import * as React from "react";
import { render } from "@testing-library/react";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nForTests";

//dummy
import { dummyConfigData } from "./mock-api-data";

export const handlers = [
  rest.get("http://localhost:5000/api/config/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyConfigData));
  }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </QueryClientProvider>
  );
  return {
    ...result,
    rerender: (renderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          <I18nextProvider i18n={i18n}>{renderUi}</I18nextProvider>
        </QueryClientProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
