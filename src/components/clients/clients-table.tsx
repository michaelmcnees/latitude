import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
dayjs.extend(relativeTime)

export default function ClientsTable({ clients }) {
	const handleDelete = (client) => {
		console.log('Delete:', client)
	}

	const clientStatus = (status) => {
		switch (status) {
			case 'New':
				return (
					<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
						{status}
					</span>
				)
			case 'Active':
				return (
					<span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
						{status}
					</span>
				)
			case 'Fired':
				return (
					<span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
						{status}
					</span>
				)
		}
	}

	return (
		<div className="flex flex-col">
			<div className="inline-block min-w-full align-middle">
				<div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="w-full px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									Name
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									Status
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									Created
								</th>
								<th scope="col" className="relative px-6 py-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{clients.length > 0 ? (
								clients.map((client) => (
									<tr key={client.id}>
										<td className="whitespace-nowrap px-6 py-4">
											<div className="flex flex-col justify-center">
												<Link href={`/dashboard/clients/${client.id}`}>
													<a className="text-sm font-medium text-indigo-600">
														{client.name}
													</a>
												</Link>
												<p className="text-sm text-gray-500">{client.name}</p>
											</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											{clientStatus(client.status)}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
											{dayjs(client.createdAt).fromNow()}
										</td>
										<td className="space-x-4 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
											<Link href={`/dashboard/clients/${client.id}/edit`}>
												<a className="text-indigo-600 hover:text-indigo-900">
													Edit
												</a>
											</Link>
											<button
												onClick={() => handleDelete(client)}
												className="text-red-600 hover:text-red-900"
											>
												Delete
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={4}
										className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500"
									>
										No clients have been added
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
