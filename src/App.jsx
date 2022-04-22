import axios from 'axios'
import React from 'react'
class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			term: '',
			images: [],
		}
	}

	submitHandle = (e) => {
		console.log('Inside SubmitHandle Rendering')
		this.setState((state) => ({
			term: e.target.value,
		}))
		this.check()
	}

	check = async () => {
		console.log('Inside Check')
		const data = await axios.get('https://api.unsplash.com/search/photos', {
			params: {
				page: 30,
				query: this.state.term,
			},
			headers: {
				Authorization: 'Client-ID pd5ekWyj2BksoAGCnAf4UFLrFmgcyyCAKC0-iViDZBQ',
			},
		})
		console.log(data.data.results)
		console.log(this.state.images)
		this.setState((state) => ({
			images: data.data.results,
		}))

		console.log('Inside Check')
	}
	render() {
		return (
			<>
				<div>
					<input
						type='text'
						name='term'
						value={this.state.term}
						onChange={this.submitHandle}
					/>
				</div>
				<div>
					{this.state.images.map((ele) => {
						return (
							<div key={ele.id}>
								<p>{console.log(ele.id)}</p>
								<div>{ele.description}</div>
								<div>
									<img
										src={ele.urls.full}
										alt={ele.description}
										style={{ height: '100vh', width: '100vh' }}
									/>
								</div>
							</div>
						)
					})}
				</div>
			</>
		)
	}
}
export default App
