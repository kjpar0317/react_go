module.exports = {
    stories: ['../src/components/**/*.stories.js'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-actions/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-notes/register',
    ],
};
