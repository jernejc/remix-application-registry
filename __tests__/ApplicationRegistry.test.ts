
import ApplicationRegistry from '../ApplicationRegistry';

// Get mocked components 
// Should leverage automatic mocking with jest here, but had issues setting it up with typescript
import MockAppManager from '../___mocks___/AppManager';
import MockApp from '../___mocks___/App';

let applicationRegistry;

beforeAll(() => {
	// Clear app data before each test
	applicationRegistry = new ApplicationRegistry(MockAppManager);

	// Clear app manager mock calls
	MockAppManager.activate.mockClear();
	MockAppManager.isActivated.mockClear();
	MockAppManager.log.mockClear();

	// Clear app mock calls
	MockApp.call.mockClear();
});

test('Register a new application called MockApp', () => {
	// Register the MockApp
	applicationRegistry.register('MockApp', MockApp);

	expect(MockAppManager.activate).toHaveBeenCalled();
	expect(applicationRegistry.plugins['MockApp']).toEqual(MockApp);
});

test('Call a method on MockApp', () => {
	// Set mock data on applicationRegistry
	applicationRegistry.plugins['MockApp'] = MockApp;
	MockAppManager.isActivated.mockReturnValueOnce(true);

	// Test method call
	applicationRegistry.call('MockApp', 'testMethod');

	expect(MockApp.call).toHaveBeenCalledWith('testMethod');
});

test('Catch error when calling a non-existing method on MockApp', () => {
	const mockError = new Error('InvalidMethod');

	// Set mock data on applicationRegistry
	applicationRegistry.plugins['MockApp'] = MockApp;
	MockAppManager.isActivated.mockReturnValueOnce(true);
	MockApp.call.mockImplementation(() => {
		throw mockError;
	});

	// Test method call
	applicationRegistry.call('MockApp', 'nonExisting');

	expect(MockAppManager.log).toBeCalledWith(mockError);
});

test('Register event on MockApp', () => {
	// Set mock data on applicationRegistry
	applicationRegistry.plugins['MockApp'] = MockApp;
	MockAppManager.isActivated.mockReturnValueOnce(true);

	const mockCb = jest.fn();

	// Test event
	applicationRegistry.on('MockApp', 'testEvent', mockCb);

	expect(MockApp.event.on).toHaveBeenCalledWith('testEvent', mockCb);
});

test('Unregister event on MockApp', () => {
	// Set mock data on applicationRegistry
	applicationRegistry.plugins['MockApp'] = MockApp;
	MockAppManager.isActivated.mockReturnValueOnce(true);

	// Test event
	applicationRegistry.off('MockApp', 'testEvent');

	expect(MockApp.event.off).toHaveBeenCalledWith('testEvent');
});