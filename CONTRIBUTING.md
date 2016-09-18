# Contributing

Thank you for contributing! :star2:

By contributing to Ghost storage adapter S3, you agree to abide
by the [code of conduct](./CODE_OF_CONDUCT.md).

## Issues

Please
[open an issue](https://github.com/colinmeinke/ghost-storage-adapter-s3/issues/new)
for discussion before you spend the time to submit a pull request.

## Development

### Project setup

1. [Fork this repository](https://github.com/colinmeinke/ghost-storage-adapter-s3/fork)
2. Clone your fork:
   `git clone git@github.com:your-username/ghost-storage-adapter-s3.git && cd ghost-storage-adapter-s3`
3. Install the dependencies: `npm install`

You should now be able to use the npm scripts to carry
out some useful tasks:

- `npm run build`
- `npm run commit`

For a full list checkout the
[`package.json` file](.package.json).

### Creating a pull request

Your master branch should be kept clean and you should
create a new branch for each pull request.

#### Set the upstream

```
git remote add upstream git@github.com:colinmeinke/ghost-storage-adapter-s3.git
```

#### Create a new branch

`git checkout -b my-branch-name`

#### Committing

Once you've made your changes you'll need to commit.

We use
[semantic release](https://github.com/semantic-release/semantic-release)
for releasing this module to npm, and generating changelogs.

Semantic release relies upon commit message syntax,
therefore commit messages are important.

We use
[Angular's commit message conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit).

Running `npm run commit` will guide you through the process.

#### Fetch changes from master

```
git checkout master
git pull upstream master
```

#### Rebase your changes

```
git checkout my-branch-name
git rebase master
```

#### Push your changes

```
git push -u origin my-branch-name
```

#### Submit your pull request

[Follow Github's instructions](https://help.github.com/articles/creating-a-pull-request/).

#### Keeping your pull request in sync

Sometimes new commits will be made to Ghost storage adapter
S3 whilst you're waiting for your pull request to be merged.

In this case your pull request will need some extra work
so it can be cleanly merged.

1. [Fetch changes from master](#fetch-changes-from-master)
2. [Rebase your changes](#rebase-your-changes)
3. Force push (carefully!): `git push -f origin my-branch-name`
