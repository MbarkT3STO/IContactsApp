using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Interfaces;

public interface IQueryResult<TResult>
{
    TResult? Value { get; }
    bool HasValue => Value != null;
    bool IsEmpty => !HasValue || (Value is Collection<object> collection && !collection.Any());

    bool IsSuccess { get; }
    bool IsFailure => !IsSuccess;

    Exception? Exception { get; }
    bool HasException => Exception != null;
    string? ErrorMessage { get; }
}
