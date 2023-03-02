/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   board.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ahkhilad <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/21 00:07:39 by ahkhilad          #+#    #+#             */
/*   Updated: 2019/06/24 15:26:40 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

char		**ft_board(int size)
{
	int		i;
	char	**board;

	i = 0;
	board = (char **)malloc(sizeof(char *) * (size + 1));
	while (i < size)
	{
		board[i] = ft_strnew(size);
		ft_memset(board[i], '.', size);
		i++;
	}
	board[i] = NULL;
	return (board);
}
