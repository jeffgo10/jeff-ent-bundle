import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnotherMfe from './AnotherMfe';
import KeycloakContext from './KeycloakContext';

const keycloak = {
  token: 'faketoken',
  authenticated: true,
  isTokenExpired: jest.fn(() => false),
  login: jest.fn()
};

const config = {
  systemParams: {
    api: {
      'int-api': { url: 'http://localhost:8082' },
      'ext-api': { url: 'http://test-fire.apps.mainline.eng-entando.com/cecchisandrone/simple-ms' }
    }
  },
  contextParams: {
    page_code: 'my_mfe_page'
  },
  params: {
    username: 'adionisi',
    description: 'Tech Lead Entando'
  }
};

test('displays fetched timestamps when "Get timestamps" button is clicked', async () => {
  const internalTimestamp = 'Jul 07, 2022 19:00';
  const externalTimestamp = 'Jul 07, 2022 11:00';

  jest
    .spyOn(global, 'fetch')
    .mockImplementation(
      jest.fn((url) => {
        console.log(url)
        if (url === config.systemParams.api['int-api'].url + '/api/timestamp')
          return Promise.resolve({ json: () => Promise.resolve({ timestamp: internalTimestamp }), ok: true })
        if (url === config.systemParams.api['ext-api'].url + '/api/timestamp')
          return Promise.resolve({ json: () => Promise.resolve({ timestamp: externalTimestamp }), ok: true })
      })
    )

  render(
    <KeycloakContext.Provider value={keycloak}>
      <AnotherMfe config={config} />
    </KeycloakContext.Provider>
  );

  const getTimestampsBtnEl = screen.getByText(/Get timestamps/i);
  userEvent.click(getTimestampsBtnEl);

  expect(await screen.findByText(`Internal timestamp: ${internalTimestamp}`)).toBeInTheDocument();
  expect(await screen.findByText(`External timestamp: ${externalTimestamp}`)).toBeInTheDocument();
});
