import escapeHtml from 'escape-html';
import getData from './get-data';
import calculateBias from './calculate-bias';

const buildBiasElement = async username => {
	const data = await getData(username);

	const container = document.createElement('div');
	container.innerHTML = `
	<div class="ProfileCardBias ProfileCardStats">
		<div style="text-align: center"><strong>Bitcoin or Shitcoiner?</strong></div>
	</div>`;
	const biases = container.children[0];

	if (data) {
		const currencies = calculateBias(data);

		const container = document.createElement('div');
		container.innerHTML = `
		<div class="bias">
			<span class="ProfileCardStats-statLabel u-block">${escapeHtml(currencies[0].name)} ${Number(currencies[0].bias)}%</span>
			<div class="bias-amount-container">
				<div class="bias-amount bias-left u-bgUserColor" style="width: ${Number(currencies[0].bias)}%;"></div>
				<div class="bias-amount bias-right u-bgUserColor" style="width: ${Number(currencies[1].bias)}%;"></div>
			</div>
			<span class="ProfileCardStats-statLabel u-block" style="text-align: right;">${Number(currencies[1].bias)}% ${escapeHtml(currencies[1].name)}</span>
		</div>`;
		biases.append(container.children[0]);
	} else {
		biases.append(document.createTextNode('No analysis available for this user.'));
	}

	return biases;
};

export default buildBiasElement;
