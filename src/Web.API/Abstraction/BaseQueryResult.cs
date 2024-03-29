using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Interfaces;

namespace Web.API.Abstraction;

public abstract class BaseQueryResult<TResult> : IQueryResult<TResult>
{
    public TResult? Value { get; }
    public bool HasValue => Value != null;
    public bool IsEmpty => !HasValue || (Value is Collection<object> collection && !collection.Any());

    public bool IsSucceeded { get; } = true;
    public bool IsFailed => !IsSucceeded;

    public bool HasException => Exception != null;
    public Exception? Exception { get; }
    public string? ErrorMessage { get; }



    protected BaseQueryResult(TResult? value)
    {
        Value = value;
    }

    protected BaseQueryResult(TResult? value, bool isSuccess = true, Exception? exception = null, string? errorMessage = null)
    {
        Value = value;
        IsSucceeded = isSuccess;
        Exception = exception;
        ErrorMessage = errorMessage;
    }

    protected BaseQueryResult(Exception? exception, string? errorMessage)
    {
        IsSucceeded = false;
        Exception = exception;
        ErrorMessage = errorMessage;
    }

    protected BaseQueryResult(Exception? exception)
    {
        IsSucceeded = false;
        Exception = exception;
    }
}