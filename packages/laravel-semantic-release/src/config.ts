import { GlobalConfig } from 'semantic-release';

export default {
	branch: 'develop',
	tagFormat: '${version}',
	repositoryUrl: undefined, // this is handled through the project's package.json
	plugins: [
		['@semantic-release/commit-analyzer', {
			preset: 'peakfijn',
			releaseRules: 'release-rules-peakfijn',
		}],
		['@semantic-release/release-notes-generator', { preset: 'peakfijn' }],
		'@semantic-release/changelog',
		'@semantic-release/npm',
		['semantic-release-git-branches', {
			branchPush: true,
			branchMerges: ['develop', 'master'],
			message: 'release: create new version ${nextRelease.version}\n\n${nextRelease.notes}',
			assets: [
				'CHANGELOG.md',
				'composer.json',
				'composer.lock',
				'package.json',
				'package-lock.json',
			],
		}],
	],
} as GlobalConfig
