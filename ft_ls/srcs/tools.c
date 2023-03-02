/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tools.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/07 14:29:53 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/04 15:11:06 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	ft_lstrmv(t_dir **head)
{
	t_dir	*next;
	int		i;

	next = NULL;
	i = 0;
	while (*head)
	{
		next = (*head)->next;
		if ((*head)->name)
			free((*head)->name);
		free(*head);
		*head = next;
		i++;
	}
}

void	ft_boardel(char **board)
{
	int		i;

	i = 0;
	if (!board)
		return ;
	while (board[i])
	{
		if (board[i])
			free(board[i]);
		i++;
	}
	free(board);
}

void	ft_swap(char **a, char **b)
{
	char	*sto;

	sto = NULL;
	sto = *a;
	*a = *b;
	*b = sto;
}
