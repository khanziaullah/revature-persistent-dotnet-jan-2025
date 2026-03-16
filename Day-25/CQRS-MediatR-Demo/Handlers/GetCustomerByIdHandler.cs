using CqrsMediatRDemo.Data;
using CqrsMediatRDemo.Queries;
using CqrsMediatRDemo.ReadModel;
using MediatR;

namespace CqrsMediatRDemo.Handlers
{
    public class GetCustomerByIdHandler : IRequestHandler<GetCustomerById, CustomerDto?>
    {
        private readonly ICustomerReadRepository _read;
        public GetCustomerByIdHandler(ICustomerReadRepository read) => _read = read;

        public Task<CustomerDto?> Handle(GetCustomerById q, CancellationToken ct)
            => _read.GetByIdAsync(q.Id, ct);
    }
}